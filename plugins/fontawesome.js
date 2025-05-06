import { library, config } from '@fortawesome/fontawesome-svg-core';
import {
  faCheckCircle,
  faChevronDown,
  faChevronLeft,
  faChevronUp,
  faDiagramProject,
  faExpand,
  faHome,
  faMinimize,
  faMinusCircle,
  faPlusCircle,
  faRandom,
  faSearch,
  faTable,
  faTimes,
  faTimesCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faPlusCircle,
  faMinusCircle,
  faTable,
  faTrash,
  faChevronUp,
  faChevronDown,
  faRandom,
  faChevronLeft,
  faHome,
  faDiagramProject,
  faTimes,
  faExpand,
  faMinimize,
  faCheckCircle,
  faTimesCircle,
  faSearch
);

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FaIcon', FontAwesomeIcon, config);
});
