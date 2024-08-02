<template>
  <div class="chat-title">
    <div></div>
    <div class="title">
      {{ 'LOVE小队' }}
    </div>
    <div class="userHeadimg">
      <img :src="userInfo.pic"  @click="showLoginOut">
    </div>
  </div>
  <div class="chat-content">
    <!-- recordContent 聊天记录数组-->
    <div v-for="(itemc , indexc) in recordContent" :key="indexc">
      <span v-if="typeof itemc == 'string'" class="addtext">
        {{ itemc }}
      </span>
      <!-- 对方 -->
      <div class="word" v-else-if="!itemc.mineMsg">
        <!-- <img :src="itemc.headUrl" /> -->
        <el-avatar
        :src="itemc.headUrl"
      />
        <div class="info">
          <p class="time">
            {{ itemc.nickName }} {{ moment(itemc.timestamp).utcOffset(8).format('HH:mm') }}
          </p>
          <div class="info-content">{{ itemc.contactText }}</div>
        </div>
      </div>
      <!-- 我的 -->
      <div class="word-my" v-else>
        <div class="info">
          <p class="time">
            {{ itemc.nickName }} {{ moment(itemc.timestamp).utcOffset(8).format('HH:mm') }}
          </p>
          <div class="info-content">{{ itemc.contactText }}</div>
        </div>
        <img :src="itemc.headUrl" />
      </div>
    </div>
    <div class="footer">
      <el-input v-model="inputText"  @keydown.enter="submitText()"/>
      <el-button @click="submitText()">发送</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import config from "../../api/config";
// import { elInput } from "element-plus";
import moment from "moment";
import {useStore} from "vuex"

const store = useStore()
const userInfo = store.state.userInfo



let url = config.ws + `?name=${userInfo.username}`;
const socket = new WebSocket(url);
const inputText = ref<string>("");

interface recordContents  {
  timestamp:string ;
  headUrl:string;
  nickName:string;
  contactText:string;
  userava?:string ;
  username?:string;
  mineMsg?:string;
}
const recordContent = ref<recordContents[] | string[] >([]);


onMounted(() => {
  // 处理WebSocket连接事件
  socket.addEventListener("open", (event) => {
    console.log("WebSocket连接已打开", event);
  });
});


socket.addEventListener("message", async (event) => {
  let message = JSON.parse(event.data);
  console.log('消息=',message);
  console.log('类型=' , typeof(message))
 if(typeof(message)=='object' && Array.isArray(message)){
    recordContent.value.push(...message);
  }else{
    recordContent.value.push(message);
  }
});

const submitText = () => {
  let timestamp =  moment();
  let headUrl = userInfo.userpic;
  let data = {
    nickName: userInfo.username,
    timestamp,
    headUrl,
    contactText: inputText.value,
  };

  let params = JSON.stringify(data);
  socket.send(params);
  inputText.value=''
};



/**
 * 显示退出
 */
 const showLoginOut = ()=>{
  console.log('退出')
 }
</script>

<style lang="scss" scoped>
.chat-content {
  
  width: 100%;
  padding:10px 20px;
  box-sizing: border-box;
  .addtext {
    background: #dde;
    display: block;
    box-sizing: border-box;

    width: 300px;
    // height: 20px;
    margin: 10px auto;
    text-align: center;
    border-radius: 13px;
    padding: 3px;
  }
  .word {
    display: flex;
    margin-bottom: 20px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .info {
      margin-left: 10px;
      .time {
        font-size: 12px;
        color: rgba(51, 51, 51, 0.8);
        margin: 0;
        height: 20px;
        line-height: 20px;
        margin-top: -5px;
      }
      .info-content {
        padding: 10px;
        font-size: 14px;
        background: #fff;
        position: relative;
        margin-top: 8px;
      }
      //小三角形
      .info-content::before {
        position: absolute;
        left: -8px;
        top: 8px;
        content: "";
        border-right: 10px solid #fff;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
      }
    }
  }

  .word-my {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .info {
      width: 90%;
      margin-left: 10px;
      text-align: right;
      .time {
        font-size: 12px;
        color: rgba(51, 51, 51, 0.8);
        margin: 0;
        height: 20px;
        line-height: 20px;
        margin-top: -5px;
        margin-right: 10px;
      }
      .info-content {
        max-width: 70%;
        padding: 10px;
        font-size: 14px;
        float: right;
        margin-right: 10px;
        position: relative;
        margin-top: 8px;
        background: #a3c3f6;
        text-align: left;
      }
      //小三角形
      .info-content::after {
        position: absolute;
        right: -8px;
        top: 8px;
        content: "";
        border-left: 10px solid #a3c3f6;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
      }
    }
  }
  .footer {
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0;
    left: 0;
    padding: 5px 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    background-color: #eee;
    .el-button{
      margin:0 5px ;
      height: 40px;
      width: 100px;
      border-radius: 20px;
      background-color:#a3c3f6;
    }
    .el-input{
      padding: 2px 5px;
      box-sizing: border-box;
      height: 40px;
      border: none;
      border-radius: 20px;
      padding: 0;

    }
  }
}
</style>
