<script>
// 导入Vue框架
import { createApp } from 'vue';

// 导入路由配置文件
import router from './router/index.js';

export default {
  name: 'App', // 组件名称

  created() {
    // 在组件创建时创建Vue应用实例
    const app = createApp(this);

    // 使用路由配置
    app.use(router);

    // 将Vue应用挂载到DOM节点上
    app.mount('#app');
  }
}
</script>

<template>
  <!-- 根组件模板 -->
  <div id="app">
    <!-- 路由视图，用于显示匹配到的路由组件 -->
    <router-view></router-view>
  </div>
</template>

