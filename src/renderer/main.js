import Vue from'vue';

import App from'./App';
import router from'./router';
import store from'./store';
import{ library } from'@fortawesome/fontawesome-svg-core';
import{ FontAwesomeIcon } from'@fortawesome/vue-fontawesome';
import{ faFolderOpen, faUnlockAlt, faLock, faSave } from'@fortawesome/free-solid-svg-icons';

library.add(faFolderOpen);
library.add(faUnlockAlt);
library.add(faLock);
library.add(faSave);

Vue.component('font-awesome-icon', FontAwesomeIcon);

if(!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app');
