import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/richTextEditor',
      name: 'RichTextEditor',
      component: () => import(/* webpackChunkName: "RichTextEditor" */ './views/RichTextEditor/RichTextEditor.vue'),
    },
  ],
});
