<template>
  <div class="container">
    <div class="form-container">
      <h1 class="title">用户添加</h1>
      <div class="input-group">
        <el-input v-model="username" placeholder="请输入用户名" class="input-field" size="large"></el-input>
        <el-input v-model="password" placeholder="请输入密码" type="password" class="input-field" size="large"></el-input>
        <el-input v-model="cardNumber" placeholder="请输入卡号" class="input-field" size="large"></el-input>
      </div>
      <div class="button-container">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button type="danger" @click="goBack">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/index.js";
import { ElInput, ElButton } from 'element-plus';

export default {
  data() {
    return {
      username: '',
      password: '',
      cardNumber: ''
    };
  },

  methods: {
    goBack() {
      router.push('/home/user');
    },
    handleSubmit() {
      // 提交数据到后端的逻辑
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.form-container {
  border: 1px solid #ccc;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 20px;
}

.title {
  font-size: 25px;
  margin-bottom: 25px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.input-field {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}

.input-field input {
  font-size: 25px; /* 自定义文字大小，根据需要调整 */
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 300px;
}
</style>
