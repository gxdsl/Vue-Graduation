<template>
  <div class="container">
    <!-- 左侧表格部分 -->
    <div class="left">
      <div class="user-table">
        <h1 class="Head">管理员列表</h1>
        <!-- 新建管理员的按钮 -->
        <div>
          <el-button type="primary" @click="showAddDialog = true">新建管理员</el-button>
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
              :width="700"
              :height="800"
          />
        </div>
      </div>
    </div>

    <!-- 右侧内容部分分为上下两部分 -->
    <div class="right">
      <div class="upper">
        <!-- 上部分内容 -->
        <!-- 这里放置右侧上部分的内容 -->

        <div class="introduction">
          <h2 class="el-title" style="text-align: center; font-size: 40px;">校园直饮水管理系统设计</h2>
          <p style="font-size: 18px;">
            <strong>Vue3：</strong> Vue3是一种现代化的JavaScript框架，采用Composition
            API设计，提供更灵活的组件开发方式。增强了开发效率和可维护性，有助于构建现代化的前端应用。
          </p>
          <p style="font-size: 18px;">
            <strong>Element Plus：</strong> Element
            Plus是基于Vue3的UI组件库，提供了丰富的UI组件和样式。可帮助快速构建美观、易用的Web应用界面，适合用于后台管理系统的设计和开发。
          </p>
          <p style="font-size: 18px;">
            <strong>Gin框架：</strong> Gin框架基于Go语言，具有高性能和低内存消耗的特点。提供快速的路由功能、中间件支持、参数绑定以及JSON/XML序列化等功能，有助于构建高效的Web应用程序。
          </p>
        </div>
      </div>
      <div class="lower">
        <!-- 下部分内容 -->
        <!-- 这里放置右侧下部分的内容 -->
        <el-calendar :first-day-of-week="1"></el-calendar>
      </div>
    </div>
  </div>

  <!-- 弹窗 -->
  <AddUserDialog v-if="showAddDialog" @closeDialog="showAddDialog = false" @rechargeSuccess="refreshTable"/>

</template>

<script lang="jsx" setup>
import {h, onMounted, ref} from 'vue';
import {ElButton, ElCalendar, ElMessage, ElTag} from "element-plus";
import {Edit} from "@element-plus/icons-vue";
import {fetchAdminList} from '@/API/list.js';
import AddUserDialog from '@/components/admin/add.vue';

const showAddDialog = ref(false);

const handleUpdate = (id) => {
  console.log(id);
  // 跳转到修改用户页面，携带用户ID参数
  // router.push("/home/admin/modify?id=" + id);
};

onMounted(async () => {
  try {
    tabledata.value = await fetchAdminList();
  } catch (error) {
    console.error('Error fetching user data:', error);
    ElMessage.error('获取用户数据失败');
  }
});

const getPasswordVisible = () => {
  return ref(false);
};
const passwordVisible = getPasswordVisible();

fetchAdminList().then(data => {
  tabledata.value = data;
  console.log(data);
}).catch(error => {
  console.error('Error fetching user data:', error);
  ElMessage.error('获取用户数据失败');
});

const columns = [
  {
    key: "ID",
    dataKey: "ID",
    title: "ID",
    width: 80,
  },
  {
    key: "username",
    dataKey: "Username",
    title: "用户名",
    width: 180,
  },
  {
    key: "Password",
    dataKey: "Password",
    title: "密码",
    width: 180,
    cellRenderer: ({cellData}) => {
      return passwordVisible.value ? cellData : h(
          ElButton,
          {type: "text", onClick: () => passwordVisible.value = !passwordVisible.value},
          {default: () => "*****"}
      );
    },
  },
  {
    key: "Status",
    dataKey: "Status",
    title: "状态",
    width: 50,
    cellRenderer: ({cellData}) => {
      console.log(cellData);
      return h(
          ElTag,
          {type: cellData ? "success" : "danger"},
          {default: () => cellData ? "启用" : "禁用"}
      );
    }
  },
  {
    key: "Handle",
    title: "操作",
    width: 250,
    align: "center",
    cellRenderer: ({rowData}) => (
        <>
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

const tabledata = ref([]);

const refreshTable = async () => {
  try {
    tabledata.value = await fetchAdminList();
  } catch (error) {
    console.error('Error fetching user data:', error);
    ElMessage.error('获取用户数据失败');
  }
};

</script>

<style scoped>
/* Flex布局容器 */
.container {
  display: flex;
}

/* 左侧区域样式 */
.left {
  flex: 1;
  padding-right: 10px;
}

/* 右侧区域样式 */
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 右侧上部分样式 */
.upper {
  flex: 1;
  margin-bottom: 10px;
  border: 1px solid #ccc; /* 添加边框 */
  border-radius: 10px; /* 边框圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-right: 10px;
  padding: 0 10px;
}

/* 右侧下部分样式 */
.lower {
  flex: 1;
  border: 1px solid #ccc; /* 添加边框 */
  border-radius: 10px; /* 边框圆角 */
  padding: 10px; /* 添加内边距 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-right: 10px;
  margin-bottom: 10px;
}

/* 标题样式 */
.Head {
  font-size: 30px;
  text-align: center;
  padding-top: 0;
}

/* 用户表格样式 */
.user-table {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 20px;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  position: relative;
}

/* 通用div样式 */
div {
  margin-top: 10px;
}
</style>

