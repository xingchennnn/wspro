<template>
  <el-container>
    <el-header></el-header>
    <el-main>
      <div class="login">
        <h3>添加账号</h3>
        <!-- <el-upload></el-upload> -->
        <el-input placeholder="请输入昵称" v-model="data.userInfo.username" />
        <el-input placeholder="请输入密码" />
        <div class="btns">
          <el-button @click="login">登录</el-button>
          <el-button @click="login">注册</el-button>
        </div>
      </div>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
let store = useStore();
let router = useRouter();

let data = ref({
  userInfo: {
    username: "",
    // userpic:'https://pica.zhimg.com/v2-89be1e0c4169d3b2afd37fd3d221dbb2_xll.jpg?source=32738c0c',
    userpic:"https://ts1.cn.mm.bing.net/th?id=OIP-C.zl32ej_HY_zgPWkih0k1TwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    userId: "333",
  },
});

// onMounted(()=>{
//   store.commit('setuserInfo' , data.value.userInfo)
// })

const login = () => {
  store.commit("setuserInfo", data.value.userInfo);
  // 使用 $router.push 进行页面跳转
  router.push("/ws");
};
</script>

<style lang="scss">
.el-container {
  background-color: rgb(245, 245, 245);
  height: 100%;
  .el-main {
    // height: 100%;
    .login {
      margin: 0 auto;
      width: 15rem;
      height: 12rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      .btns{
        padding: 5px 0;
         display: flex;
         justify-content: center;
         align-items: center;

      }
    }
  }
}
</style>
