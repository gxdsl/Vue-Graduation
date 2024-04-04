<template>
  <h1>用户管理</h1>
  <!-- 添加用户的按钮 -->
  <div>
    <el-button type="primary" @click="handleAdd">添加用户</el-button>
  </div>
  <!-- 搜索面板 -->
  <div>
    <el-input type="text" placeholder="姓名" v-model="searchName"/>
  </div>
  <!-- table列表显示 -->
  <el-table-v2
      :columns="columns"
      :data="tabledata"
      :width="900"
      :height="400"
  />
  <!-- 分页 -->
</template>

<script lang="jsx" setup>
import { h, onMounted, ref } from 'vue';
import { ElButton, ElMessage, ElTag } from "element-plus";
import { Edit, Delete } from "@element-plus/icons-vue";
import axios from "axios";

// 定义搜索框的响应式数据
const searchName = ref('');

// 删除操作的处理函数
const handleDelete = (id) => {
  console.log(id);
  // 执行删除操作的逻辑
};

// 添加用户的处理函数
const handleAdd = () => {
  // 跳转到添加用户页面
  // router.push("/home/admin/add");
};

// 修改用户的处理函数
const handleUpdate = (id) => {
  console.log(id);
  // 跳转到修改用户页面，携带用户ID参数
  // router.push("/home/admin/modify?id=" + id);
};

// 获取用户数据的函数
const fetchUserData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8888/user/list');
    tabledata.value = response.data.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    ElMessage.error('获取用户数据失败');
  }
};

// 在页面加载时调用fetchUserData函数获取用户数据
onMounted(() => {
  fetchUserData();
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
  },
  {
    key: "state",
    dataKey: "state",
    title: "状态",
    width: 80,
    // 自定义渲染状态列的内容
    cellRenderer: ({ cellData }) =>
        h(
            ElTag,
            { type: cellData === "1" ? "success" : "danger" },
            { default: () => cellData === "1" ? "有效" : "无效" }
        )
  },
  {
    key: "Handle",
    title: "操作",
    width: 200,
    align: "center",
    // 自定义渲染操作列的内容
    cellRenderer: ({rowData}) => (
        <>
          <ElButton
              type="danger"
              icon={Delete}
              onClick={() => handleDelete(rowData.id)}
          >
            充值
          </ElButton>
          <ElButton
              type="primary"
              icon={Edit}
              onClick={() => handleUpdate(rowData.id)}
          >
            修改
          </ElButton>
        </>
    ),
  },
];

// 表格数据
const tabledata = ref([]);

</script>

<style scoped>
div {
  margin-top: 10px;
}
</style>
