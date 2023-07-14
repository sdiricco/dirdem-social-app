import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './registerServiceWorker';


/*********************************************
 * IONIC
 *********************************************/
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import './theme/variables.css';
import '@popperjs/core';

/* import font awesome */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faUserSecret, faSatelliteDish, faMoon, faSun, faWifi, faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import router from './router/router';

/* add icons to the library */
library.add(faUserSecret, faSatelliteDish, faMoon, faSun, faWifi, faMagnifyingGlass, faCircleXmark)


const pinia = createPinia();

const app = createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(pinia)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});

