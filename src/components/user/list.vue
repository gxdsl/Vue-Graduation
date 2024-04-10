<template>
  <h1 class="Head">用户管理</h1>
  <div class="user-table">
    <!-- 添加用户的按钮 -->
    <div>
      <el-button type="primary" @click="showAddDialog = true">添加用户</el-button>
    </div>
    <!-- 搜索面板 -->
    <div>
      <el-input type="text" placeholder="用户名"/>
    </div>
    <!-- table列表显示 -->
    <div>
      <el-table-v2
          :columns="columns"
          :data="tabledata"
          :width="1500"
          :height="820"
      />
    </div>
  </div>

  <!--  弹窗  -->
  <AddUserDialog v-if="showAddDialog" @closeDialog="showAddDialog = false" @rechargeSuccess="refreshTable"/>
  <RechargeDialog v-if="showRechargeDialog" :User="selectedUser" :Balance="parseFloat(selectedBalance)"
                  @closeDialog="showRechargeDialog = false" @rechargeSuccess="refreshTable"/>

  <!-- 分页 -->

</template>

<script lang="jsx" setup>
import {h, onMounted, ref} from 'vue';
import {ElButton, ElIcon, ElMessage, ElTag} from "element-plus";
import {Edit, Wallet} from "@element-plus/icons-vue";
import {fetchUserList} from '@/API/list.js';
import AddUserDialog from '@/components/user/add.vue';
import RechargeDialog from '@/components/user/recharge.vue';

const showAddDialog = ref(false);
const showRechargeDialog = ref(false);
const selectedUser = ref('');
const selectedBalance = ref('');

// 充值操作的处理函数
const handleRecharge = (User, Balance) => {
  console.log(User);

  //用户名传递
  selectedUser.value = User;

  //余额传递
  selectedBalance.value = Balance;

  // 弹出充值窗口
  showRechargeDialog.value = true;
};

// 修改用户的处理函数
const handleUpdate = (id) => {
  console.log(id);
  // 跳转到修改用户页面，携带用户ID参数
  // router.push("/home/admin/modify?id=" + id);
};

// 在页面加载时调用fetchUserList函数获取用户数据
onMounted(async () => {
  try {
    tabledata.value = await fetchUserList();
  } catch (error) {
    console.error('Error fetching user data:', error);
    // ElMessage.error('获取用户数据失败');
  }
});

// 定义密码可见性的响应式数据
const getPasswordVisible = () => {
  return ref(false);
};
const passwordVisible = getPasswordVisible();

fetchUserList().then(data => {
  tabledata.value = data;
}).catch(error => {
  console.error('Error fetching user data:', error);
  ElMessage.error('获取用户数据失败');
});

// 定义表格列的配置信息
const columns = [
  {
    key: "ID",
    dataKey: "ID",
    title: "ID",
    width: 80,
  },
  {
    key: "username",
    dataKey: "User",
    title: "用户名",
    width: 180,
  },
  {
    key: "card",
    dataKey: "Card",
    title: "卡号",
    width: 180,
  },
  {
    key: "Balance",
    dataKey: "Balance",
    title: "余额",
    width: 180,
  },
  {
    key: "Password",
    dataKey: "Password",
    title: "密码",
    width: 180,
    // 自定义渲染密码列的内容
    cellRenderer: ({cellData}) => {
      return passwordVisible.value ? cellData : h(
          ElButton,
          {type: "text", onClick: () => passwordVisible.value = !passwordVisible.value},
          {default: () => "*****"}
      );
    },

  },
  {
    key: "state",
    dataKey: "state",
    title: "状态",
    width: 80,
    // 自定义渲染状态列的内容
    cellRenderer: ({cellData}) =>
        h(
            ElTag,
            {type: cellData === "1" ? "success" : "success"},
            {default: () => cellData === "1" ? "正常" : "正常"}
        )
  },
  {
    key: "Handle",
    title: "操作",
    width: 300,
    align: "center",
    // 自定义渲染操作列的内容
    cellRenderer: ({rowData}) => (
        <>
          <ElButton
              type="success"
              icon={<ElIcon><Wallet/></ElIcon>}
              onClick={() => handleRecharge(rowData.User, rowData.Balance)}
          >
            充值
          </ElButton>
          <ElButton
              type="primary"
              icon={Edit}
              onClick={() => handleUpdate(rowData.User)}
          >
            修改
          </ElButton>
        </>
    ),
  },
];

// 表格数据
const tabledata = ref([]);

// 刷新表格数据的方法
const refreshTable = async () => {
  try {
    tabledata.value = await fetchUserList();
  } catch (error) {
    console.error('Error fetching user data:', error);
    ElMessage.error('获取用户数据失败');
  }
};

</script>


<style scoped>

.Head {
  font-size: 30px;
  text-align: center; /* 文字居中 */
}

.user-table {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 添加黑色阴影边框 */
  padding: 20px; /* 内边距 */
  border-radius: 20px; /* 边框圆角半径 */
  margin-right: 10px; /* 右侧外边距 */
  margin-left: 10px; /* 左侧外边距 */
  margin-bottom: 10px;
  position: relative;
}

div {
  margin-top: 10px;
}
</style>
