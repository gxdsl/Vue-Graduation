// API/user.js
import axiosInstance from "@/API/axiosInstance.js";
import {ElMessage} from "element-plus";


const AddAPI = {
    async ADD(username, password, cardNumber) {
        try {
            const formData = new FormData();
            formData.append('user', username);
            formData.append('password', password);
            formData.append('card', cardNumber);

            const response = await axiosInstance.post('/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                // message: 'User added successfully'
            });
            response.message = 'User added successfully'


            // 处理后端返回的响应
            if (response.status >= 200 && response.status < 300) {
                ElMessage.success(response.message);
                return response.data;
            } else {
                ElMessage.error(response.message);
                // throw new Error('Failed to add user');
            }
        } catch (error) {
            ElMessage.error(error.message);
            // throw new Error('Error adding user: ' + error.message);
        }
    }
};

const RechargeAPI = {
    async Recharge(username, balance) {
        try {
            const formData = new FormData();
            formData.append('user', username);
            formData.append('balance', balance);

            const response = await axiosInstance.post('/user/recharge', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                // message: 'User recharged successfully'
            });
            response.message = 'User recharged successfully'


            // 处理后端返回的响应
            if (response.status >= 200 && response.status < 300) {
                ElMessage.success(response.message);
                return response.data;
            } else {
                ElMessage.error(response.message);
                // throw new Error('Failed to add user');
            }
        } catch (error) {
            ElMessage.error(error.message);
            // throw new Error('Error adding user: ' + error.message);
        }
    }
};


export {AddAPI, RechargeAPI };
