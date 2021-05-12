import { onMounted } from '@vue/runtime-core'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import {handleStorage} from '@/hooks/handleStorage'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/vip',
    component: ()=>import('../views/home/Home.vue'),
    children: [
      {
        path: '/home/vip',
        name: 'vip',
        component:() => import('../views/home/vip.vue'),
      },
      {
        path: '/home/customer',
        name: 'customer',
        component:() => import('../views/home/customer.vue'),
      },
      {
        path: '/home/content',
        name: 'content',
        component:() => import('../views/home/contentControl.vue'),
      },
      {
        path: '/home/report',
        name: 'report',
        component:() => import('../views/home/report.vue'),
      },
      {
        path: '/home/worktable',
        name: 'worktable',
        component:() => import('../views/home/worktable.vue'),
      },
    ]
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
    let{getStorage}=handleStorage()
    console.log(to.name)
    let token:string | null = getStorage('token')
    if(token!=null){
        next()
    }else{
        if(to.name === 'login'){
          next()
        }else{
          next({path:'/'})
        }
    }
    
})

export default router
