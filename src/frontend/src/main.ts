import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const configElement = document.querySelector('#DigiEditConfig');
if (configElement) {
    const config = JSON.parse(configElement.innerHTML);
    store.commit('setConfig', config);
    store.dispatch('init');
}

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
