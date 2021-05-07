<template>
  <div class="login">
    <div class="content">
      <div class="title-box">
        <img src="@/assets/images/logo.png" class="img" />
        <div class="titles">七夜业务管理平台</div>
      </div>
      <a-form layout="horizontal" :model="formMsg" @submit.prevent="submit">
        <a-space direction="vertical" style="width: 100%" :size="size">
          <a-input
            size="large"
            placeholder="请输入账号"
            v-model:value="formMsg.username"
          >
            <template v-slot:prefix
              ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
          <a-input
            size="large"
            placeholder="请输入密码"
            type="password"
            v-model:value="formMsg.password"
            autocomplete
          >
            <template v-slot:prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
          <a-button
            :loading="loading"
            size="large"
            style="width: 100%"
            type="primary"
            html-type="submit"
            >登录</a-button
          >
        </a-space>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { Button, Input, Space, Form, message } from "ant-design-vue";
import { IloginParams, Iresult, LOGINCODESTATE } from "@/assets/request/typing";
import { handleStorage } from "@/hooks/handleStorage";
import { handleToken } from "@/hooks/handleToken";
import {
  UserOutlined,
  LockOutlined,
  createFromIconfontCN,
} from "@ant-design/icons-vue";
import { httplogin } from "@/assets/request/api";
import { Router, useRouter } from "vue-router";
const IconFont: any = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});
const md5 = require("md5");
export default defineComponent({
  name: "login",
  components: {
    UserOutlined,
    LockOutlined,
    aButton: Button,
    aInput: Input,
    aSpace: Space,
    aForm: Form,
    IconFont,
  },
  setup() {
    const size: number = 20;
    const loginState = reactive({
      loading: false,
      formMsg: <IloginParams>{
        username: "",
        password: "",
      },
    });
    const { saveToken } = handleToken();
    const { setStorage } = handleStorage();
    const router:Router = useRouter()
    const submit = async (): Promise<void> => {
      //submit login message
      let { username, password } = <IloginParams>loginState.formMsg;
      if (username.trim() == "" || password.trim() == "") {
        message.warning("用户名或密码不能为空!");
        return;
      }
      const hide = message.loading("登录中...", 0); //message.destroy()
      loginState.loading = true;
      const result: Iresult = await httplogin({
        username,
        password: md5(password),
      });
      message.destroy();
      loginState.loading = false;
      let { code, msg, data } = result;
      if (code == LOGINCODESTATE.RcOk) {
        message.success("登录成功");
        setStorage("token", data);
        saveToken(data as string);
        router.push('/home')
      } else {
        message.info(`${msg},请核对` || "登录失败");
      }
    };
    return {
      size,
      submit,
      ...toRefs(loginState),
    };
  },
});
</script>
<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background-color: #fff;
  background-image: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: 110px;
  background-size: 100%;
  align-items: center;
  justify-content: center;
  .content {
    width: 368px;
    margin-bottom: 100px;
    .title-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      .img {
        width: 40px;
      }
      .titles {
        display: block;
        font-size: 30px;
        margin-left: 15px;
      }
    }
  }
}
</style>
