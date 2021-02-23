import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import homePage from '../components/homePage/homePage.vue'

import editor from '../views/editor.vue'
import invite from '../components/InviteCompanies.vue'

import inviteList from '../components/inviteList.vue'

import HomePageLeft from '../components/homePage/HomePageLeft.vue'
import HomePageRight from '../components/homePage/homePageRight.vue'
import invitation from '../components/homePage/invitation.vue'
import InvitePage from '../components/homePage/InvitePage.vue'

import InvitationsReceived from '../components/homePage/InvitationsReceived.vue'
import emit from '../components/homePage/InvitationEmit.vue'

import EmitPage from '../components//homePage/EditPage.vue'
import minorView from '../components/homePage/minorView.vue'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  redirect: '/HomePageRight',
  children: [{
    path: '/HomePageRight',
    name: 'HomePageRight',
    component: HomePageRight
  }, {
    path: '/invitation',
    name: 'invitation',
    component: invitation,
    redirect: '/emit',
    children: [{
      path: '/InvitationsReceived',
      name: 'InvitationsReceived',
      component: InvitationsReceived
    }, {
      path: '/emit',
      name: 'emit',
      component: emit
    }]
  }, {
    path: '/InvitePage',
    name: 'InvitePage',
    component: InvitePage
  }, {
    path: '/EmitPage',
    name: 'EmitPage',
    component: EmitPage
  }, {
    path: '/minorView',
    name: 'minorView',
    component: minorView
  }]
}]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
