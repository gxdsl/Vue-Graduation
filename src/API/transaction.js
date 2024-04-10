// @/API/transaction.js
import axiosInstance from './axiosInstance';
import { ElMessage } from "element-plus";

const TransactionAPI = {
    async Total() {
        try {
            const response = await axiosInstance.get('/data/spendtotal');
            console.log('Total spend:', response.data.total);
            return response.data; // 返回获取到的总消费数据
        } catch (error) {
            console.error('Error fetching total spend:', error.message);
            return null; // 返回 null 或者适当的错误信息
        }
    },
    async List(page, pageSize) {
        try {
            const formData = new FormData();
            formData.append('page', page);
            formData.append('pageSize', pageSize);

            const response = await axiosInstance.post('/data/spenddata', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            // 处理后端返回的响应
            if (response.status >= 200 && response.status < 300) {
                // ElMessage.success('Get transaction successfully');
                return response.data;
            } else {
                // throw new Error('Failed to get transaction data');
            }
        } catch (error) {
            console.error('Error fetching transaction data:', error.message);
            ElMessage.error('Failed to get transaction data');
            throw error;
        }
    }
};

export { TransactionAPI };
