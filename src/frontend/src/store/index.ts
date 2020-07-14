import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router/index';

interface State {
    config: Config;
    data: DataState;
    userId: string;
}

interface Config {
    api: APIConfig;
}

interface APIConfig {
    baseURL: string;
}

interface DataState {
    [x: string]: {[y: string]: JSONAPIObject};
}

interface JSONAPIObject {
    type: string;
    id?: string;
    attributes: JSONAPIAttributes;
    relationships: JSONAPIRelationships;
}

interface JSONAPIAttributes {
    [x: string]: string | null;
}

interface JSONAPIRelationships {
    [x: string]: JSONAPIRelationship;
}

interface JSONAPIRelationship {
    data: JSONAPIReference | JSONAPIReference[];
}

interface JSONAPIReference {
    type: string;
    id: string;
}

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        config: {
            api: {
                baseURL: '',
            },
        },
        data: {},
        userId: '',
    } as State,
    mutations: {
        setConfig(state, config: Config) {
            state.config = config;
        },

        setUserId(state, userId) {
            state.userId = userId;
        },

        setObject(state, obj) {
            if (state.data[obj.type]) {
                Vue.set(state.data[obj.type], obj.id, obj);
            } else {
                Vue.set(state.data, obj.type, {[obj.id]: obj});
            }
        },
    },
    actions: {
        async init({ dispatch, state }) {
            if (state.userId !== '') {
                await dispatch('loadUser');
                await dispatch('loadBranches');
            } else {
                router.push({name: 'login'});
            }
        },

        async loadUser({ dispatch, state }) {
            try {
                const user = await dispatch('fetchSingle', {type: 'users', id: state.userId})
            } catch(error) {
                console.log(error);
            }
        },

        async loadBranches({ dispatch, commit }) {
            dispatch('fetchAll', 'branches');
        },

        async fetchAll({ commit, state }, type: string) {
            const objs = axios.get(state.config.api.baseURL + '/' + type);
        },

        async fetchSingle({ commit, state }, ref) {
            const obj = axios.get(state.config.api.baseURL + '/' + ref.type + '/' + ref.id);
        },
    },
    modules: {
    }
})
