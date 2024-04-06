<template>
  <!-- 根组件模板 -->
  <div id="app">
    <!-- 路由视图，用于显示匹配到的路由组件 -->
    <router-view></router-view>
  </div>
</template>

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

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%; /* 设置页面高度为100% */
}

#app {
  width: 100%; /* 设置宽度为100% */
  height: 100%; /* 设置高度为100% */
  position: fixed; /* 将根元素固定定位 */
  top: 0; /* 从页面顶部开始 */
  left: 0; /* 从页面左侧开始 */
  overflow: hidden; /* 隐藏溢出内容 */
}
</style>
