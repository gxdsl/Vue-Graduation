// @/API/equip.js
import axiosInstance from './axiosInstance';
import {ElMessage} from "element-plus";

const EquipAPI = {
    async Latest() {
        try {
            const response = await axiosInstance.get('/data/latest');
            console.log('Latest data:', response.data);
            return response.data; // 返回获取到的最新数据
        } catch (error) {
            console.error('Error fetching total spend:', error.message);
            return null; // 返回 null 或者适当的错误信息
        }
    },
    async Chart() {
        try {
            const response = await axiosInstance.get('/data/list');

            console.log('List data:', response.data);
            return response.data; // 返回获取到的最新数据

        } catch (error) {
            console.error('Error fetching transaction data:', error.message);
            ElMessage.error('Failed to get transaction data');
            throw error;
        }
    }
};

export {EquipAPI};