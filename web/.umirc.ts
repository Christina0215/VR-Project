import { defineConfig } from 'umi';

export default defineConfig({
  layout:{
    name: '宿舍管理系统',
    layout: 'side',
    logo:'/QKteam.png',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  links: [
    { rel: 'icon', href: '/QKteam.png' },
  ],
});
