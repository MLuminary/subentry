import Home from '../views/Home.vue'

let prefix = ''

if (window.__POWERED_BY_QIANKUN__) {
  prefix = '/vue'
}

export const routes = [
  {
    path: `${prefix}/`,
    name: 'Home',
    component: Home,
  },
  {
    path: `${prefix}/about`,
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]
