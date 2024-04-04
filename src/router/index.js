// 导入Vue Router相关模块
import {createRouter, createWebHistory} from 'vue-router';

// 导入相关组件
import Login from '@/View/Login.vue';
import Home from '@/View/Home.vue'
// import User from '../components/User.vue'

// 定义路由配置
const routes = [
    {
        path: '/', // 路由路径
        name: 'login', // 路由名称
        component: Login // 对应的组件
    },
    {
        path: '/home', // 路由路径
        name: 'home', // 路由名称
        component: Home, // 对应的组件
        redirect: '/home/admin', // 重定向到默认子路由
        children: [
            {
                path: 'admin',
                name: "admin",
                component: () => import("@/View/Admin.vue")
            },
            {
                path: 'user',
                name: "user",
                component: () => import("@/View/User.vue")
            },
            {
                path: 'equip',
                name: "equip",
                component: () => import("@/View/Equipment.vue")
            },
            {
                path: 'consume',
                name: "consume",
                component: () => import("@/View/Consume.vue")
            },
        ],
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

