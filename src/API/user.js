// API/user.js
import axios from 'axios';
import axiosInstance from "@/API/axiosInstance.js";
import {ElMessage} from "element-plus";

export const fetchUserList = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8888/user/list');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('获取用户数据失败');
    }
};


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
                message: 'User added successfully'
            });
            response.message = 'User added successfully'


            // 处理后端返回的响应
            if (response.status === 201) {
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


export default AddAPI;
