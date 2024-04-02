<script>
import SilderVerify from '../SilderVerify/index.vue'; // 引入滑块验证组件
import { ElMessage } from 'element-plus'; // 引入 Element Plus 的 Message 组件
import authAPI from '../API/login.js'; // 引入登录接口

export default {
  name: 'Login',

  components: {
    SilderVerify
  },

  data() {
    return {
      username: '',
      password: '',
      loginForm: {
        status: false
      },
      errorMessage: '' // 新增 errorMessage 变量
    };
  },

  methods: {
    handleSuccess() {
      this.loginForm.status = true;
    },

    handleError() {
      ElMessage.error('滑块验证失败，请重试');
    },

    checkVerification() {
      if (this.loginForm.status) {
        this.login();
      } else {
        ElMessage.warning('请完成滑块验证');
        this.$refs.sliderVerify.reset(); // 重置滑块验证组件
      }
    },

    login() {
      authAPI.login(this.username, this.password)
          .then(response => {
            if (response.data.code === 200) {
              this.$router.push('/home');
            } else {
              const errorMessage = `错误码: ${response.data.code}, 错误信息: ${response.data.message}`;
              ElMessage.error(errorMessage);
              this.errorMessage = errorMessage;
            }
          })
          .catch(error => {
            let errorMessage = '登录请求失败，请检查网络连接';
            if (error.response) {
              errorMessage = `登录失败，${error.response.status}`;
            } else {
              errorMessage = '登录失败，请稍后重试';
            }
            ElMessage.error(errorMessage);
            this.errorMessage = errorMessage;
          });
    },
  }
};
</script>

<template>
  <!-- 登录页面容器 -->
  <div class="login-background">
    <div class="header-text">
      校园直饮水管理系统
    </div>
    <div class="login">
      <h2 class="text1">管理员登录</h2>
      <form class="form">
        <div class="input-group">
          <input type="text" v-model="username" placeholder="用户名" required>
        </div>
        <div class="input-group">
          <input type="password" v-model="password" placeholder="密码" required>
        </div>
        <el-form-item prop="status">
          <silder-verify @success="handleSuccess" @failed="handleError" ref="sliderVerify"></silder-verify>
        </el-form-item>
        <button type="button" @click="checkVerification" style="font-size: 25px; padding: 5px;">登录</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-text {
  text-align: center; /* 文本居中 */
  font-size: 45px; /* 设置文字大小*/
  color: black; /* 文字颜色为黑色 */
  margin-bottom: 20px; /* 底部外边距为20px */
  position: absolute; /* 绝对定位 */
  top: calc(50% - 300px); /* 以登录表单的中心为基准向上偏移 */
  left: 75%; /* 左边距 */
  transform: translate(-50%, -50%); /* 使用 transform 属性将文本水平和垂直居中 */
}

.login {
  position: absolute; /* 绝对定位 */
  top: 50%; /* 顶部距离为页面高度的50% */
  left: 75%; /* 左边距离为页面宽度的50% */
  transform: translate(-50%, -50%); /* 使用 transform 属性将容器水平和垂直居中 */
  max-width: 500px; /* 设置容器最大宽度为300px */
  padding:40px; /* 内边距 */
  background-color: white; /* 背景色为白色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 添加黑色阴影边框 */
  border-radius: 20px; /* 边框圆角半径 */
  //width: 50%;
}

.text1{
  text-align: center; /* 文本居中 */
  font-size: 30px; /* 设置文字大小*/
  color: black; /* 设置文字颜色*/
  margin-bottom: 40px;/* 设置距离低部的距离*/
}

label {
  margin-bottom: 5px; /* 底部外边距为5px */
  color: black; /* 文字颜色为黑色 */
  font-size: 20px; /* 设置文字大小*/
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.input-group {
  margin-bottom: 15px;

  width: 100%;
}

input {
  width: 90%;
  padding: 10px;
  font-size: 20px;
  color: black;
  border-radius: 10px; /* 边框圆角半径 */
}

button {
  padding: 12px 25px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  width: 100%; /* 设置按钮宽度与输入框相同 */
  border-radius: 10px; /* 边框圆角半径 */
}

</style>
