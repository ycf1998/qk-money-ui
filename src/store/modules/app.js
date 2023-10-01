import {defineStore} from 'pinia'
import authApi from '@/api/module/auth.js'
import Layout from "@/layouts/DashboardLayout.vue";
const views = import.meta.glob('@/views/**')

export const useAppStore = defineStore('app', {
    state: () => ({
        routes: null,
    }),
    actions: {
        async loadRoutes() {
            const {data} = await authApi.getDyRoutes()
            if (data) {
                this.routes = []
                data.filter(e => !e.hidden).forEach(e => {
                    const route = {
                        path: '/' + e.path,
                        component: Layout,
                        meta: e.meta,
                        iframe: e.iframe,
                    }
                    if (e.children && e.children.length > 0) {
                        route.children = e.children.filter(e => !e.hidden)
                            .map(o => {
                                return {
                                    name: o.name,
                                    path: o.path,
                                    component: views[`/src/views/${o.component}.vue`],
                                    meta: o.meta,
                                    iframe: o.iframe
                                }
                            })
                    } else {
                        route.children = [{
                            name: e.name,
                            path: '',
                            component: views[`/src/views/${e.component}.vue`],
                            meta: e.meta,
                            iframe: e.iframe
                        }]
                    }
                    this.routes.push(route)
                    this.$router.addRoute(route)
                })
                console.log(this.routes)
            }
        }
    }
})