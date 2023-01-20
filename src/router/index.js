import { createRouter, createWebHashHistory } from "vue-router"
const routes = [
    { path: '/note', component: () => import('../views/Note.vue') },
    { path: '/login', component: () => import('../views/Login.vue') },
    { path: '/sign', component: () => import('../views/Sign.vue') },
    { path: '/change', component: () => import('../views/Change.vue') },
    { path: '/web', component: () => import('../views/Web.vue') },
    {
        path: '/',
        redirect: '/web'
    }
]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
export { router }