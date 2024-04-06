<template>
  <div class="container">
    <div class="menu">
      <!--      左侧菜单-->
      <el-radio-group v-model="isCollapse" style="margin-bottom: 10px">
        <el-radio-button :value="false">展开</el-radio-button>
        <el-radio-button :value="true">收缩</el-radio-button>
      </el-radio-group>
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
      >
        <el-menu-item index="1">
          <el-icon>
            <document/>
          </el-icon>
          <template #title>
            <router-link to="/home/admin" class="menuTitle">管理员</router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <template #title>
            <router-link to="/home/user" class="menuTitle">用户管理</router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon>
            <document/>
          </el-icon>
          <template #title>
            <router-link to="/home/equip" class="menuTitle">设备管理</router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon>
            <setting/>
          </el-icon>
          <template #title>
            <router-link to="/home/consume" class="menuTitle">消费管理</router-link>
          </template>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="content">
      <!--    右侧内容-->
      <router-view></router-view> <!-- Ensure router-view is placed here -->
    </div>
  </div>
</template>

<script setup>

import {ref} from 'vue'
import {Document, Menu as IconMenu, Setting,} from '@element-plus/icons-vue'

const isCollapse = ref(false)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style>

.container {
  display: flex;
  min-width: 1280px;
  margin: 0 auto;
}

.menu {
  position: fixed;
  top: 0; /* 从页面顶部开始 */
  bottom: 0; /* 到页面底部结束 */
  left: 0; /* 从页面左侧开始 */
  width: 198px; /* 设置侧边栏宽度 */
  box-sizing: border-box;
  background-color: #101010;
  padding: 0;
}

.el-menu-item {
  background-color: #101010; /* 设置el-menu-item的背景颜色 */
  color: #fff; /* 设置图标颜色为白色 */
}

.menuTitle{
  color: #fff; /* 设置文字颜色为白色 */
  text-decoration: none; /* 去掉文字下划线 */
  font-size: 16px;
}

.content{
  position: fixed;
  top: 0; /* 从页面顶部开始 */
  bottom: 0; /* 到页面底部结束 */
  left: 220px; /* 从页面左侧开始 */
}

</style>



