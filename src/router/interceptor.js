import NProgress from "nprogress";
import 'nprogress/nprogress.css'
import {getToken, removeToken} from "@/composables/token.js";
import {useUserStore, useAppStore} from "@/store/index.js";

// 白名单
const whitelist = ['/login']

export default function (router) {
    router.beforeEach(async (to, from, next) => {
        NProgress.start()
        if (import.meta.env.VITE_ONLY_UI) {
            useUserStore().info = {
                avatar: ''
            }
            useUserStore().roles = [{level:0}]
            useUserStore().permissions = []
            next()
            return
        }
        const hasToken = getToken();
        if (hasToken && to.path === '/login') {
            next({path: '/'})
        } else if (hasToken) {
            try {
                if (!useAppStore().routes && !import.meta.env.VITE_ONLY_UI) {
                    await useAppStore().loadRoutes()
                    router.replace(to.fullPath)
                    next()
                    return
                }
                await useUserStore().loadInfo()
                next()
            } catch (e) {
                removeToken()
                next(`/login?redirect=${to.path}`)
            }
        } else if (whitelist.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    })

    router.afterEach(() => {
        NProgress.done()
    })

    return router
}
