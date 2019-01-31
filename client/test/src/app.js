import Vue from 'vue'
import App from './index.vue'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

export function createApp(data) {
    const app = new Vue({
        data,
        // 根实例简单的渲染应用程序组件。
        render: h => h(App)
    })
    return { app }
}