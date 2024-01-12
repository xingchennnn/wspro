<template>
  <div class="chat-content">
    <!-- recordContent 聊天记录数组-->
    <div v-for="(itemc, indexc) in recordContent" :key="indexc">
      <div v-if="typeof itemc == 'string'" class="addtext">
        {{ itemc }}
      </div>
      <!-- 对方 -->
      <div class="word" v-else-if="!itemc.mineMsg">
        <el-image :src="itemc.headUrl" />
        <div class="info">
          <p class="time">{{ itemc.nickName }} {{ itemc.timestamp }}</p>
          <div class="info-content">{{ itemc.contactText }}</div>
        </div>
      </div>
      <!-- 我的 -->
      <div class="word-my" v-else>
        <div class="info">
          <p class="time">{{ itemc.nickName }} {{ itemc.timestamp }}</p>
          <div class="info-content">{{ itemc.contactText }}</div>
        </div>
        <img :src="itemc.headUrl" />
      </div>
    </div>
    <div class="footer">
      <ElInput v-model="inputText" />
      <ElButton @click="submitText()">发送</ElButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import config from "../../api/config";
import { ElInput, ElButton } from "element-plus";
// import {DataView} from "vue"

let url = config.ws + "?name=haha";
const socket = new WebSocket(url);

const inputText = ref<string>("");
const recordContent = ref<unknown[]>([]);
interface DataView {
  getString(byteOffset: number, byteLength: number, encoding?: string): string;
}

onMounted(() => {
  // 处理WebSocket连接事件
  socket.addEventListener("open", (event) => {
    console.log("WebSocket连接已打开", event);
  });
});
socket.addEventListener("message", (event) => {
  // 处理收到的消息
  // console.log(event.data);
  // // 假设 binaryData 是从WebSocket接收到的二进制数据
  // const binaryData: ArrayBuffer = event.data as ArrayBuffer;

  // // 创建一个 DataView 对象以便读取二进制数据
  // const dataView   = new DataView(binaryData);

  // // 根据你的数据格式解析数据，这只是一个简单的示例
  // const message = dataView.getString(0, binaryData.byteLength, "utf-8");
  // console.log("解析后的消息：", message);

//   // 将二进制数据转换为ArrayBuffer
// var arrayBuffer = new ArrayBuffer(event.data.length);
// // 将ArrayBuffer转换为JSON对象
// var jsonObject = JSON.parse(arrayBufferToString(arrayBuffer));






  recordContent.value.push(event.data);
});

const submitText = () => {
  let timestamp = "18:00";
  let headUrl =
    "http://sheisi.love:9000/be16a1c1-cc4f-41b8-be0a-b0a000acd6fa.png";
  let params: any = {
    nickName: "haha",
    timestamp,
    headUrl,
    contactText: inputText.value,
  };

  socket.send(params);
};
</script>

<style lang="scss" scoped>
.chat-content {
  width: 100%;
  padding: 20px;
  .addtext {
    background: #ddd;
    width: 160px;
    height: 20px;
    margin: 0 auto;
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
    bottom: 0;
    display: flex;
    justify-content: center;
  }
}
</style>
