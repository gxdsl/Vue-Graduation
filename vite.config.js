// 导入Node.js中的'fileURLToPath'和'URL'模块
import {fileURLToPath, URL} from 'node:url'

// 导入vite的'defineConfig'函数和Vue插件
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';

// Vite配置对象
export default defineConfig({
    // 插件配置
    plugins: [
        vue(), // 使用Vue插件
        vueJsx(), // 使用Vue JSX插件
    ],
    // 解析配置
    resolve: {
        alias: {
            // 设置别名，将'@'指向项目根目录下的'src'文件夹
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})

