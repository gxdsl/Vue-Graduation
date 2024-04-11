<template>
  <div>
    <el-table-v2
        :columns="columns"
        :data="pagedData"
        :width="700"
        :height="800"
    />
    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total">
    </el-pagination>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { TransactionAPI } from '@/API/transaction.js';

const columns = [
  {
    key: 'ID',
    dataKey: 'ID',
    title: 'ID',
    width: 80
  },
  {
    key: 'User',
    dataKey: 'User',
    title: '用户名',
    width: 150
  },
  {
    key: 'DispenserID',
    dataKey: 'DispenserID',
    title: '饮水机ID',
    width: 150
  },
  {
    key: 'Amount',
    dataKey: 'Amount',
    title: '消费金额',
    width: 200
  },
  {
    key: 'TransactionTime',
    dataKey: 'TransactionTime',
    title: '消费时间',
    width: 250
  }
];

const currentPage = ref(1);
const pageSize = ref(20);
const total = ref(0);
const pagedData = ref([]);

// 当前页变化处理函数
const handleCurrentChange = async (val) => {
  currentPage.value = val;
  await fetchData();
};

// 每页显示数量变化处理函数
const handleSizeChange = async (val) => {
  pageSize.value = val;
  currentPage.value = 1; // 将当前页重置为第一页
  await fetchData();
};

// 获取数据函数
const fetchData = async () => {
  try {
    const totalResponse = await TransactionAPI.Total();

    if (totalResponse && totalResponse.total !== undefined) {
      total.value = totalResponse.total;

      const data = await TransactionAPI.List(currentPage.value, pageSize.value);

      console.log('Transaction data:', data);
      // console.log('data.transactions:', data.pagedata);

      if (data && data.pagedata) {
        pagedData.value = data.pagedata.map(transaction => {
          return {
            ID: transaction.ID,
            User: transaction.User,
            DispenserID: transaction.DispenserID,
            Amount: transaction.Amount,
            TransactionTime: new Date(transaction.TransactionTime).toLocaleString()
          };
        });
      } else {
        console.error('Error: Transaction data is missing or incomplete');
      }
    } else {
      console.error('Error: Total spend data is missing or incomplete');
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

onMounted(() => {
  fetchData();
});
</script>
