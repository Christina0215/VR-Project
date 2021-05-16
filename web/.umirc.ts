import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  links: [{ rel: 'icon', href: '/QKteam.png' }],
  routes: [
    { path: '/Login', component: 'Login/Login' },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [{ path: '/Houselist', component: 'HouseList/HouseList' }],
    },

  ],
});
