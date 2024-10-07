import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronLeft, faChevronUp, faHome, faPlusCircle, faRandom, faTable, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faPlusCircle,
  faTable,
  faTrash,
  faChevronUp,
  faChevronDown,
  faRandom,
  faChevronLeft,
  faHome
);

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FaIcon', FontAwesomeIcon, config);
});
