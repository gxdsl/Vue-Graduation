// 导入Vue Router相关模块
import { createRouter, createWebHistory } from 'vue-router';

// 导入相关组件
import Login from '../components/Login.vue';
import Home from '../components/Home.vue'

// 定义路由配置
const routes = [
    {
        path: '/', // 路由路径
        name: 'Login', // 路由名称
        component: Login // 对应的组件
    },
    {
        path: '/home', // 路由路径
        name: 'Home', // 路由名称
        component: Home // 对应的组件
    },
    // 可以添加其他路由配置
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(), // 使用HTML5 history模式
    routes // 路由配置
});

// 导出路由实例
export default router;

