// API/user.js

import axios from 'axios';

export const fetchUserList = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8888/user/list');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('获取用户数据失败');
    }
};