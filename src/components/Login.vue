<script>
export default {
  name: 'Login', // 组件名称

  data() {
    // 组件数据
    return {
      username: '', // 用户名
      password: '' // 密码
    };
  },

  methods: {
    // 登录方法
    login() {
      // 在这里可以编写登录逻辑，比如向后端发送登录请求等
      console.log('Username:', this.username);
      console.log('Password:', this.password);
      // 这里只是简单的打印用户名和密码，实际应用中需要替换为真实的登录逻辑
    }
  }
};
</script>

<template>
  <div class="login-background">
    <!-- 在登录表单上方添加文本 -->
    <div class="header-text">
      校园直饮水管理系统
    </div>
    <!-- 登录表单 -->
    <div class="login">
      <h2>管理员登录</h2>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
        <button type="submit">登 录</button>
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
  background-image: url('../assets/Login.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-text {
  text-align: center; /* 文本居中 */
  font-size: 50px; /* 设置文字大小为24px */
  color: black; /* 文字颜色为黑色 */
  margin-bottom: 20px; /* 底部外边距为20px */
  position: absolute; /* 绝对定位 */
  top: calc(50% - 200px); /* 以登录表单的中心为基准向上偏移100px */
  left: 50%; /* 水平居中 */
  transform: translate(-50%, -50%); /* 使用 transform 属性将文本水平和垂直居中 */
}


/* 样式说明：登录表单容器样式 */
.login {
  position: absolute; /* 绝对定位 */
  top: 50%; /* 顶部距离为页面高度的50% */
  left: 75%; /* 左边距离为页面宽度的50% */
  transform: translate(-50%, -50%); /* 使用 transform 属性将容器水平和垂直居中 */
  max-width: 400px; /* 设置容器最大宽度为300px */
  padding: 50px; /* 内边距为50px */
  background-color: white; /* 背景色为白色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 添加黑色阴影边框 */
  border-radius: 5px; /* 边框圆角半径为5px */
}

label {
  margin-bottom: 5px; /* 底部外边距为5px */
  color: black; /* 文字颜色为黑色 */
  font-size: 20px; /* 设置文字大小为16px */
}

input {
  margin-bottom: 10px; /* 底部外边距为10px */
  padding: 5px; /* 内边距为5px */
  font-size: 20px; /* 设置文字大小为14px */
  color: black; /* 文字颜色为黑色 */
}

button {
  padding: 8px 20px; /* 上下内边距为8px，左右内边距为15px */
  background-color: #007bff; /* 背景色为蓝色 */
  color: white; /* 按钮文字颜色为白色 */
  border: none; /* 去除边框 */
  cursor: pointer; /* 鼠标指针样式为手型 */
}
</style>


