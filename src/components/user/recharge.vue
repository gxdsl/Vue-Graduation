<template>
  <div class="container">
    <div class="form-container">
      <h1 class="title">用户充值</h1>

      <!-- 显示当前用户的用户名 -->
      <h3>当前用户为<span style="color: blue">{{ User }}</span>,
        余额为<span style="color: red">{{ Balance }}</span>元
      </h3>

      <div class="input-group">
        <el-input v-model="amount" placeholder="请输入充值金额(元)" class="input-field" size="large"></el-input>
      </div>

      <div class="button-container">
        <el-button type="primary" @click="handleSubmit">充值</el-button>
        <el-button type="danger" @click="goBack">返回</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import {ElButton, ElInput} from 'element-plus';
import {RechargeAPI} from "@/API/user.js";

export default {
  props: {
    User: {
      type: String,
      required: true
    },
    Balance: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      amount: '',
    };
  },

  methods: {
    goBack() {
      this.$emit('closeDialog'); // 触发关闭弹窗事件
      this.$emit('rechargeSuccess');      // 触发刷新表格事件
    },
    async handleSubmit() {
      try {
        await RechargeAPI.Recharge(this.User, this.amount);
        this.goBack(); // 提交成功后关闭弹窗

      } catch (error) {
        console.error('Error recharge:', error);
        // 处理提交错误
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  background-color: #fff; /* 设置背景色为白色，可以根据需要调整 */
  opacity: 1; /* 设置不透明度为 1，表示完全不透明 */
  border: 1px solid #ccc;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 20px;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999; /* 设置一个较高的 z-index 值 */
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