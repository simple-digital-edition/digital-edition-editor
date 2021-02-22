import Vue from 'vue';
import Vuex from 'vuex';
import axios, { AxiosError } from 'axios';
import router from '../router/index';
import equal from 'fast-deep-equal';

import { sessionLoadValue, sessionStoreValue} from '../storage';

interface State {
    config: Config;
    data: DataState;
    userId: string;
    userToken: string;
    loggedIn: boolean;
    busy: boolean;
    busyCounter: number;
    maxBusyCounter: number;
    completedBusyCounter: number;
    networkAvailable: boolean;
}

interface Config {
    api: APIConfig;
    'tei-schema'?: any;
    versions: ReleaseVersion[];
}

interface APIConfig {
    baseURL: string;
    configURL: string;
    changesURL: string;
    helpURL: string;
}

interface ReleaseVersion {
    version: string;
    date: string;
    changes: ReleaseChanges[];
}

interface ReleaseChanges {
    type: 'new'|'update'|'bugfix';
    message: string;
}

interface ConfigSectionPayload {
    type: 'tei-schema';
    data: any;
}

interface DataState {
    [x: string]: {[y: string]: JSONAPIObject};
}

export interface JSONAPIObject {
    type: string;
    id?: string;
    attributes: JSONAPIAttributes;
    relationships: JSONAPIRelationships;
}

export interface JSONAPIAttributes {
    [x: string]: string | null;
}

export interface JSONAPIRelationships {
    [x: string]: JSONAPIRelationship;
}

export interface JSONAPIRelationship {
    data: JSONAPIReference | JSONAPIReference[];
}

interface JSONAPIReference {
    type: string;
    id: string;
}

export interface JSONAPIError {
    title: string;
    source: JSONAPIErrorSource;
}

export interface JSONAPIErrorSource {
    pointer: string;
}

interface LoginData {
    email: string;
    password: string;
}

export interface ErrorDict {
    [x: string]: string;
}

export function errorsToDict(errors: AxiosError): ErrorDict {
    if (errors.response) {
        return errors.response.data.errors.reduce((obj: ErrorDict, error: JSONAPIError) => {
            const pointer = error.source.pointer.split('/');
            obj[pointer[pointer.length - 1]] = error.title;
            return obj;
        }, {});
    } else {
        return {};
    }
}

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        config: {
            api: {
                baseURL: '',
                configURL: '',
                changesURL: '',
                helpURL: '',
            },
            versions: [],
        },
        data: {},
        userId: '',
        userToken: '',
        loggedIn: false,
        busy: false,
        busyCounter: 0,
        maxBusyCounter: 0,
        completedBusyCounter: 0,
        networkAvailable: true,
    } as State,
    mutations: {
        setConfig(state, config: Config) {
            state.config = config;
        },

        setConfigSection(state, payload: ConfigSectionPayload) {
            Vue.set(state.config, payload.type, payload.data);
        },

        setVersions(state, payload: ReleaseVersion[]) {
            Vue.set(state.config, 'versions', payload);
        },

        setUserId(state, userId) {
            state.userId = userId;
            sessionStoreValue('user.id', userId);
        },

        setUserToken(state, userToken) {
            state.userToken = userToken;
            sessionStoreValue('user.token', userToken);
        },

        setLoggedIn(state, loggedIn) {
            state.loggedIn = loggedIn;
            sessionStoreValue('user.loggedIn', loggedIn);
        },

        setObject(state, obj) {
            if (state.data[obj.type]) {
                if (state.data[obj.type][obj.id]) {
                    if (!equal(obj, state.data[obj.type][obj.id])) {
                        Vue.set(state.data[obj.type], obj.id, obj);
                    }
                } else {
                    Vue.set(state.data[obj.type], obj.id, obj);
                }
            } else {
                Vue.set(state.data, obj.type, {[obj.id]: obj});
            }
        },

        deleteObject(state, obj) {
            if (state.data[obj.type]) {
                Vue.delete(state.data[obj.type], obj.id);
            }
        },

        setBusy(state, busy) {
            if (busy) {
                state.busyCounter = state.busyCounter + 1;
                state.maxBusyCounter = state.maxBusyCounter + 1;
            } else {
                state.busyCounter = state.busyCounter - 1;
                state.completedBusyCounter = state.completedBusyCounter + 1;
            }
            if (state.busyCounter === 0) {
                setTimeout(() => {
                    state.busy = false;
                    state.maxBusyCounter = 0;
                    state.completedBusyCounter = 0;
                }, 300);
            } else {
                state.busy = true;
            }
        },

        setNetworkAvailable(state, networkAvailable) {
            state.networkAvailable = networkAvailable;
        },
    },
    actions: {
        async init({ dispatch, commit, state }) {
            commit('setUserId', sessionLoadValue('user.id', ''));
            commit('setUserToken', sessionLoadValue('user.token', ''));
            commit('setLoggedIn', sessionLoadValue('user.loggedIn', ''));
            dispatch('loadConfig', 'tei-schema');
            dispatch('loadChanges');
            if (state.loggedIn && state.userId !== '' && state.userToken !== '') {
                await dispatch('loadUser');
                await dispatch('loadBranches');
            } else {
                router.push({name: 'login'});
            }
        },

        async loadConfig({ commit, state }, type: string) {
            try {
                commit('setBusy', true);
                const response = await axios.get(state.config.api.configURL + '/tei-schema');
                commit('setConfigSection', {type: type, data: response.data});
                commit('setBusy', false);
            } catch(error) {
                commit('setBusy', false);
            }
        },

        async loadChanges({ commit, state }) {
            const versions = (await axios({
                method: 'GET',
                url: state.config.api.changesURL,
            })).data;
            commit('setVersions', versions);
        },

        async loadUser({ dispatch, state }) {
            await dispatch('fetchSingle', {type: 'users', id: state.userId})
        },

        async loadBranches({ dispatch }) {
            const branches = await dispatch('fetchAll', 'branches');
            return branches;
        },

        async createBranch({ dispatch }, branch: JSONAPIObject) {
            branch = await dispatch('createSingle', branch);
            const promises = (branch.relationships.files.data as JSONAPIReference[]).map((fileRef) => {
                return dispatch('loadFile', fileRef);
            });
            await Promise.all(promises);
            return branch;
        },

        async loadBranch({ dispatch, state }, branch: JSONAPIObject) {
            if (state.data.branches && branch.id && state.data.branches[branch.id]) {
                branch = await dispatch('backgroundFetchSingle', branch);
                const promises = (branch.relationships.files.data as JSONAPIReference[]).map((fileRef) => {
                    return dispatch('loadFile', fileRef);
                });
                await Promise.all(promises);
                return branch;
            } else {
                branch = await dispatch('fetchSingle', branch);
                const promises = (branch.relationships.files.data as JSONAPIReference[]).map((fileRef) => {
                    return dispatch('loadFile', fileRef);
                });
                await Promise.all(promises);
                return branch;
            }
        },

        async deleteBranch({ dispatch, commit }, branch: JSONAPIObject) {
            await dispatch('deleteSingle', branch);
            (branch.relationships.files.data as JSONAPIReference[]).forEach((fileRef) => {
                commit('deleteObject', fileRef);
            });
        },

        async loadFile({ dispatch, state }, fileRef: JSONAPIReference | JSONAPIObject) {
            if (state.data.files && fileRef.id && state.data.files[fileRef.id]) {
                return await dispatch('backgroundFetchSingle', fileRef);
            } else {
                return await dispatch('fetchSingle', fileRef);
            }
        },

        async fetchAll({ commit, state }, type: string) {
            try {
                commit('setBusy', true);
                const objs = (await axios({
                    method: 'GET',
                    url: state.config.api.baseURL + '/' + type,
                    headers: {'X-Authorization': state.userId + ' ' + state.userToken}
                })).data;
                commit('setNetworkAvailable', true);
                (objs as {data: JSONAPIObject[]}).data.forEach((obj) => {
                    commit('setObject', obj);
                });
                commit('setBusy', false);
                return objs.data;
            } catch(error) {
                commit('setBusy', false);
                if (error.response && error.response.status === 401) {
                    commit('setUserId', '');
                    commit('setUserToken', '');
                    commit('setLoggedIn', '');
                    router.push({name: 'login'});
                } else {
                    commit('setNetworkAvailable', false);
                    throw error;
                }
            }
        },

        async backgroundFetchAll({ commit, state }, type: string) {
            try {
                const objs = (await axios({
                    method: 'GET',
                    url: state.config.api.baseURL + '/' + type,
                    headers: {'X-Authorization': state.userId + ' ' + state.userToken}
                })).data;
                commit('setNetworkAvailable', true);
                (objs as {data: JSONAPIObject[]}).data.forEach((obj) => {
                    commit('setObject', obj);
                });
                return objs.data;
            } catch(error) {
                if (error.response && error.response.status === 401) {
                    commit('setUserId', '');
                    commit('setUserToken', '');
                    commit('setLoggedIn', '');
                    router.push({name: 'login'});
                } else {
                    commit('setNetworkAvailable', false);
                    throw error;
                }
            }
        },

        async fetchSingle({ commit, state }, ref) {
            try {
                commit('setBusy', true);
                const obj = (await axios({
                    method: 'GET',
                    url: state.config.api.baseURL + '/' + ref.type + '/' + ref.id,
                    headers: {'X-Authorization': state.userId + ' ' + state.userToken}
                })).data.data;
                commit('setNetworkAvailable', true);
                commit('setObject', obj);
                commit('setBusy', false);
                return obj;
            } catch(error) {
                commit('setBusy', false);
                if (error.response && error.response.status === 401) {
                    commit('setUserId', '');
                    commit('setUserToken', '');
                    commit('setLoggedIn', '');
                    router.push({name: 'login'});
                } else {
                    commit('setNetworkAvailable', false);
                    throw error;
                }
            }
        },

        async backgroundFetchSingle({ commit, state }, ref) {
            try {
                const obj = (await axios({
                    method: 'GET',
                    url: state.config.api.baseURL + '/' + ref.type + '/' + ref.id,
                    headers: {'X-Authorization': state.userId + ' ' + state.userToken}
                })).data.data;
                commit('setNetworkAvailable', true);
                commit('setObject', obj);
                return obj;
            } catch(error) {
                if (error.response && error.response.status === 401) {
                    commit('setUserId', '');
                    commit('setUserToken', '');
                    commit('setLoggedIn', '');
                    router.push({name: 'login'});
                } else {
                    commit('setNetworkAvailable', false);
                    throw error;
                }
            }
        },

        async createSingle({ commit, state }, obj: JSONAPIObject) {
            try {
                commit('setBusy', true);
                obj = (await axios({
                    method: 'POST',
                    url: state.config.api.baseURL + '/' + obj.type,
                    data: {
                        data: obj,
                    },
                    headers: {'X-Authorization': state.userId + ' ' + state.userToken}
                })).data.data;
                commit('setNetworkAvailable', true);
                commit('setObject', obj);
                commit('setBusy', false);
                return obj;
            } catch(error) {
                commit('setBusy', false);
                if (error.response && error.response.status === 401) {
                    commit('setUserId', '');
                    commit('setUserToken', '');
                    commit('setLoggedIn', '');
                    router.push({name: 'login'});
                } else {
                    commit('setNetworkAvailable', false);
                    throw error;
                }
            }
        },

        async saveSingle({commit, state }, obj: JSONAPIObject) {
            try {
                commit('setBusy', true);
                obj = (await axios({
                    method: 'PATCH',
                    url: state.config.api.baseURL + '/' + obj.type + '/' + obj.id,
                    data: {
                        data: obj,
                    },
                    headers: {'X-Authorization': state.userId + ' ' + state.userToken}
                })).data.data;
                commit('setNetworkAvailable', true);
                commit('setObject', obj);
                commit('setBusy', false);
                return obj;
            } catch(error) {
                commit('setBusy', false);
                if (error.response && error.response.status === 401) {
                    commit('setUserId', '');
                    commit('setUserToken', '');
                    commit('setLoggedIn', '');
                    router.push({name: 'login'});
                } else {
                    commit('setNetworkAvailable', false);
                    throw error;
                }
            }
        },

        async deleteSingle({ commit, state }, obj: JSONAPIObject) {
            try {
                commit('setBusy', true);
                const response = await axios({
                    method: 'DELETE',
                    url: state.config.api.baseURL + '/' + obj.type + '/' + obj.id,
                    headers: {'X-Authorization': state.userId + ' ' + state.userToken}
                });
                commit('setNetworkAvailable', true);
                if (response.status === 200) {
                    commit('setObject', response.data.data);
                } else {
                    commit('deleteObject', obj);
                }
                commit('setBusy', false);
            } catch(error) {
                commit('setBusy', false);
                if (error.response && error.response.status === 401) {
                    commit('setUserId', '');
                    commit('setUserToken', '');
                    commit('setLoggedIn', '');
                    router.push({name: 'login'});
                } else {
                    commit('setNetworkAvailable', false);
                    throw error;
                }
            }
        },

        async login({ dispatch, commit, state }, loginData: LoginData) {
            try {
                commit('setBusy', true);
                const user = await axios({
                    method: 'POST',
                    url: state.config.api.baseURL + '/login',
                    data: {
                        data: {
                            type: 'users',
                            attributes: loginData,
                        },
                    },
                    headers: {'X-Authorization': state.userId + ' ' + state.userToken}
                });
                commit('setNetworkAvailable', true);
                commit('setUserId', user.data.id);
                commit('setUserToken', user.data.attributes.token);
                commit('setLoggedIn', true);
                await dispatch('init');
                router.push({name: 'root'});
                commit('setBusy', false);
            } catch(error) {
                commit('setBusy', false);
                throw error;
            }
        },

        async action({ commit, state }, payload: {obj: JSONAPIObject; action: string}) {
            try {
                commit('setBusy', true);
                const obj = (await axios({
                    method: 'POST',
                    url: state.config.api.baseURL + '/' + payload.obj.type + '/' + payload.obj.id,
                    headers: {'X-Authorization': state.userId + ' ' + state.userToken,
                              'X-Action': payload.action}
                })).data.data;
                commit('setNetworkAvailable', true);
                commit('setObject', obj);
                commit('setBusy', false);
                return obj;
            } catch(error) {
                commit('setBusy', false);
                if (error.response && error.response.status === 401) {
                    commit('setUserId', '');
                    commit('setUserToken', '');
                    commit('setLoggedIn', '');
                    router.push({name: 'login'});
                } else {
                    commit('setNetworkAvailable', false);
                    throw error;
                }
            }
        },
    },
    modules: {
    }
})
