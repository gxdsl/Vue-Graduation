// 引入全局样式表
import './assets/main.css'

// 导入Vue框架
import { createApp } from 'vue'

// 导入根组件App.vue
import App from './App.vue'

// 导入路由配置文件
import router from './router/index.js';

// 创建Vue应用实例
const app = createApp(App);

// 使用路由配置
app.use(router);

// 挂载Vue应用到DOM节点上，#app是挂载的目标DOM元素
app.mount('#app');
