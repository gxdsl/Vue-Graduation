// api/login.js
import axiosInstance from './axiosInstance';

const authAPI = {
    login: (user, password) => {
        const formData = new FormData();
        formData.append('user', user);
        formData.append('password', password);

        return axiosInstance.post('/admin/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
};

export default authAPI;
