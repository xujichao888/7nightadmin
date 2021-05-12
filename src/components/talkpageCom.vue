<template>
  <div class="talkpage">
    <div class="talk-one-msg">正在聊天的信息</div>
    <div class="btn-box">
      <a-space>
        <a-button
          v-for="(item, index) in btnList"
          :key="index"
          type="primary"
          size="small"
          >{{ item }}</a-button
        >
      </a-space>
    </div>
    <div class="send-bar">
      <div class="top">
        <div class="sendImage">
          <FolderAddOutlined
            style="color: rgb(150, 150, 150); font-size: 30px"
          />
          <div  style="font-size:12px;color: rgb(150, 150, 150)">发送图片</div>
        </div>
         <div class="sendImage">
          <FolderAddOutlined
            style="color: rgb(150, 150, 150); font-size: 30px"
          />
          <div  style="font-size:12px;color: rgb(150, 150, 150)">快捷回复</div>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <a-textarea
            v-model:value="textVal"
            placeholder="说点什么..."
            :rows="2"
            allowClear
            style="flex-shrink: 0"
          />
        </div>
        <div class="right">
          <a-button type="primary" style="width: 80%">发送</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { Button, Input, Space } from "ant-design-vue";
import { FolderAddOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    [Button.name]: Button,
    [Input.TextArea.name]: Input.TextArea,
    [Space.name]: Space,
    FolderAddOutlined,
  },
  setup() {
    let btnState = reactive({
      btnList: ["改备注", "补次数", "会员等级", "拉黑", "扣钻石", "补钻石"],
    });
    let textVal = ref("");
    return {
      ...toRefs(btnState),
      textVal,
    };
  },
});
</script>

<style lang="less" scoped>
.talkpage {
  height: 100%;
  box-sizing: border-box;
  position: relative;
  .talk-one-msg {
    height: 50px;
    background: rgb(250, 250, 250);
    border-bottom: 1px solid rgb(240, 240, 240);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn-box {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgb(240, 240, 240);
  }
  .send-bar {
    position: absolute;
    background: white;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0 10px;
    border-top: 1px solid rgb(240, 240, 240);
    .top{
        display: flex;
        height: 60px;
        .sendImage{
            margin: 5px 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-right: 10px;
        }
    }
    .bottom {
      width: 100%;
      display: flex;
      height: 60px;
      align-items: center;
      .left {
        width: 80%;
      }
      .right {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }
}
</style>