import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../components/LandingPage.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Workspaces from '../components/Workspaces.vue'
import AddWorkspace from '../components/AddWorkspace.vue'
import RegistrationConfirmation from '../components/RegistrationConfirmation.vue'
// import ComingSoon from '../components/ComingSoon.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
    meta: {
      guest: true
    }
  },
  {
    path: '/workspaces/',
    name: 'Workspaces',
    component: Workspaces,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/workspaces/add',
    name: 'Add Workspace',
    component: AddWorkspace,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/thank-you-for-signing-up',
    name: 'Thank you for signing up',
    component: RegistrationConfirmation,
    meta: {
      guest: true
    }
  }
]

const router = new VueRouter({
  mode: 'history', routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      const user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_staff)) {
        if (user.is_staff === true) {
          next()
        } else {
          next({ name: 'Workspaces' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('token') == null) {
      next()
    } else {
      next({ name: 'Workspaces' })
    }
  } else {
    next()
  }
})

export default router
