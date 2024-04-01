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
    <div class="header-text">
      校园直饮水管理系统
    </div>
    <div class="login">
      <h2 class="text1">管理员登录</h2>
      <form @submit.prevent="login" class="form">
        <div class="input-group">
          <input type="text" v-model="username" placeholder="用户名" required>
        </div>
        <div class="input-group">
          <input type="password" v-model="password" placeholder="密码" required>
        </div>
        <button type="submit" style="font-size: 25px;padding: 5px;">登  录</button>
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
  font-size: 45px; /* 设置文字大小*/
  color: black; /* 文字颜色为黑色 */
  margin-bottom: 20px; /* 底部外边距为20px */
  position: absolute; /* 绝对定位 */
  top: calc(50% - 250px); /* 以登录表单的中心为基准向上偏移 */
  left: 75%; /* 左边距 */
  transform: translate(-50%, -50%); /* 使用 transform 属性将文本水平和垂直居中 */
}

/* 样式说明：登录表单容器样式 */
.login {
  position: absolute; /* 绝对定位 */
  top: 50%; /* 顶部距离为页面高度的50% */
  left: 75%; /* 左边距离为页面宽度的50% */
  transform: translate(-50%, -50%); /* 使用 transform 属性将容器水平和垂直居中 */
  max-width: 500px; /* 设置容器最大宽度为300px */
  padding:25px; /* 内边距 */
  background-color: white; /* 背景色为白色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 添加黑色阴影边框 */
  border-radius: 20px; /* 边框圆角半径为5px */
}

.text1{
  text-align: center; /* 文本居中 */
  font-size: 30px; /* 设置文字大小*/
  color: black; /* 设置文字颜色*/
  margin-bottom: 25px;/* 设置距离低部的距离*/
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
}

.input-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 20px;
  color: black;
}

button {
  padding: 12px 25px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  width: 100%; /* 设置按钮宽度与输入框相同 */
}


</style>


