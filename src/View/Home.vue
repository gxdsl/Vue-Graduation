<template>
  <div class="container">
    <div class="menu">
      <!--      左侧菜单-->
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
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
            <router-link to="/home/admin">管理员</router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <template #title>
            <router-link to="/home/user">用户管理</router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon>
            <document/>
          </el-icon>
          <template #title>
            <router-link to="/home/equip">设备管理</router-link>
          </template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon>
            <setting/>
          </el-icon>
          <template #title>
            <router-link to="/home/consume">消费管理</router-link>
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.container {
  display: flex;
  min-width: 1280px;
  margin: 0 auto;
}

.menu {
  width: 200px;
  box-sizing: border-box;
  min-height: 500px;
}
</style>
