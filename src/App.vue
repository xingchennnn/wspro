<template>
  <div class="body" :style=" setBgcolor ">
    <router-view/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';

/**
 * 设置用户信息
 */
const store = useStore();
  // 在组件挂载之前执行
  onBeforeMount(() => {
    // 从 localStorage 中获取参数
    const localStorageParams = JSON.parse(localStorage.getItem('userInfo') || '{}');
    // 将参数传递到 Vuex 中
    store.dispatch('commituserInfo', localStorageParams);
  });

const defaultBG = ref(' background-color:rgb(245,245,245 );')

const setBgcolor = ()=>{
  return defaultBG.value
}
</script>

<style>


</style>
