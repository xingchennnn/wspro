import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'  //如果需要axios，请引入
import VForm3 from 'vform3-builds'  //引入VForm3库
// 引入element.plus
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/dist/index.css";
import 'vform3-builds/dist/designer.style.css'  //引入VForm3样式

/* 注意：如果你的项目中有使用axios，请用下面一行代码将全局axios复位为你的axios！！ */
window.axios = axios

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(VForm3)
  .mount("#app");
