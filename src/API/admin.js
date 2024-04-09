import axiosInstance from "@/API/axiosInstance.js";
import {ElMessage} from "element-plus";

const AddAPI = {
    async ADD(username, password) {
        try {
            const formData = new FormData();
            formData.append('user', username);
            formData.append('password', password);

            const response = await axiosInstance.post('/admin/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },

            });
            response.message = 'Admin added successfully'


            // 处理后端返回的响应
            if (response.status >= 200 && response.status < 300) {
                ElMessage.success(response.message);
                return response.data;
            } else {
                ElMessage.error(response.message);

            }
        } catch (error) {
            ElMessage.error(error.message);

        }
    }
};

export {AddAPI,}