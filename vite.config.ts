import { resolve } from "path";
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig((mode)=>{
  const env = loadEnv(mode.mode, process.cwd());
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
      extensions: [".ts", ".vue", ".js", ".jsx", ".tsx"], // 类型： string[] 导入时想要省略的扩展名列表。
    },
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_PORT),
      open: env.VITE_OPEN
    },
  }
})
