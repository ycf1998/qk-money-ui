import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon.vue'

import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import PerfectScrollbar from 'vue3-perfect-scrollbar'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/style/reset-element.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
    install: (app, options) => {
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
        app.component('svg-icon', SvgIcon)
        app.use(PerfectScrollbar)
    }
}