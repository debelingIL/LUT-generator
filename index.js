// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;
const { mapActions } = Vuex;

const delay = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(Math.random()), ~~(Math.random * 2000));
  });

const state = {
  foo: null,
  bar: null
};

const actions = {
  test: ({ commit }) =>
    Promise.all([
      delay().then(num => commit("FOO", num)),
      delay().then(num => commit("BAR", num))
    ])
};

const mutations = {
  FOO: (state, num) => {
    state.foo = num;
  },
  BAR: (state, num) => {
    state.bar = num;
  }
};

Vue.use(Vuex);
let store = new Vuex.Store({
  state,
  actions: {
    test: actions.test
  },
  mutations,
  plugins: [createLogger()]
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  methods: {
    ...mapActions(["test"])
  },
  created: function() {
    this.test();
  },
  template: "<App/>",
  components: { App }
});
