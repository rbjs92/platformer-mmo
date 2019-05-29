import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Play from './views/Play.vue'

Vue.use(Router)

function isNotLoggedIn(to, from, next) {
  if (localStorage.token) {
    next('/play')
  } else {
    next()
  }
}

function isLoggedIn(to, from, next) {
  if (localStorage.token) {
    next()
  } else {
    next('/login')
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/play',
      name: 'play',
      component: Play,
      beforeEnter: isLoggedIn,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: isNotLoggedIn,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: isNotLoggedIn,
    },
  ],
})
