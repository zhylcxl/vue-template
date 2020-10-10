import Vue from 'vue';
import App from './App';
import router from './router';

import 'core-js';
import 'regenerator-runtime/runtime';

new Vue({
  el: '#app',
  template: '<App></App>',
  components: {
    App
  },
  router
})