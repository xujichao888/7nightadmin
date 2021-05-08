<template>
  <a-layout-header class="headers">
    <!-- <button v-on:click="show = !show">Toggle</button>
    <transition name="fade">
      <p v-if="show">hello</p>
    </transition> -->
    <div class="collapsed-box">
      <div @click="setCollapsed(!collapsed)">
        <MenuFoldOutlined class="icon" v-if="!collapsed" />
        <MenuUnfoldOutlined class="icon" v-else />
      </div>
      <div class="avatar-box">
        <a-dropdown>
          <div>
            <a-avatar size="large" :src="ownmsg.avatarimg">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
            <span class="nickname">{{ ownmsg.nickname }}</span>
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item
                @click="
                  () => {
                    visible = true;
                  }
                "
              >
                <LockOutlined style="color: rgba(0, 0, 0, 0.65)" />
                <span style="color: rgba(0, 0, 0, 0.65)">修改密码</span>
              </a-menu-item>
              <a-menu-item @click="handleLogout">
                <LogoutOutlined />
                <span style="color: rgba(0, 0, 0, 0.65)">退出登录</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
  <a-modal
    v-model:visible="visible"
    title="修改密码"
    @ok="handleOk"
    cancelText="取消"
    okText="确定修改"
    :confirm-loading="confirmLoading"
    width="380px"
    style="top: 25%"
    @submit="handleSub"
  >
    <a-form ref="formRef" :model="formState" :rules="rules">
      <a-form-item
        ref="oldpassword"
        label="原密码"
        name="oldpassword"
        style="width: 100%"
      >
        <a-input-password autocomplete v-model:value="formState.oldpassword" />
      </a-form-item>
      <a-form-item
        ref="newpassword"
        label="新密码"
        name="newpassword"
        style="width: 100%"
      >
        <a-input-password autocomplete v-model:value="formState.newpassword" />
      </a-form-item>
      <a-form-item
        ref="macksure"
        label="确认密码"
        name="macksure"
        style="width: 100%"
        v-model:value="formState.macksure"
      >
        <a-input-password autocomplete v-model:value="formState.macksure" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang='ts'>
import { computed, defineComponent, reactive, ref, UnwrapRef } from "vue";
import {
  Layout,
  Avatar,
  Dropdown,
  Menu,
  Modal,
  Form,
  Input,
  message,
} from "ant-design-vue";
import { Store, useStore } from "vuex";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LockOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import { handleStores, IhandleStore } from "@/hooks/handleStore";
import { useForm } from "@ant-design-vue/use";
import { Iownmsg } from "@/store/storeTyping";
import { RuleObject } from "node_modules/ant-design-vue/lib/form/interface";
import { Router, useRouter } from "vue-router";
import { handleStorage } from "@/hooks/handleStorage";
export default defineComponent({
  components: {
    [Layout.Header.name]: Layout.Header,
    [Dropdown.name]: Dropdown,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Avatar.name]: Avatar,
    [Modal.name]: Modal,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.Password.name]: Input.Password,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    LockOutlined,
    LogoutOutlined,
  },
  setup() {
    interface FormState {
      oldpassword: string;
      newpassword: string;
      macksure: string;
    }
    console.log("headersetup");
    const formRef = ref<any>();
    const formState = reactive({
      oldpassword: "",
      newpassword: "",
      macksure: "",
    });
    const value = ref<string>("");
    let checkPassword = async (rule: RuleObject, value: number) => {
      if (!value) {
        return Promise.reject("确认密码不能为空");
      }
      if (formState.macksure != formState.newpassword) {
        return Promise.reject("两次密码不一致");
      }
    };
    const rules = {
      oldpassword: [
        { required: true, message: "原密码不能为空", trigger: "blur" },
      ],
      newpassword: [
        { required: true, message: "新密码不能为空", trigger: "blur" },
      ],
      macksure: [
        { required: true, validator: checkPassword, trigger: "change" },
      ],
    };
    const store: Store<any> = useStore();
    const router: Router = useRouter();
    const { setCollapsed }: IhandleStore = handleStores();
    const collapsed = computed(() => store.state.collapsed);
    const ownmsg = computed(() => store.state.ownmsg);
    const visible = ref<boolean>(false);
    const confirmLoading = ref<boolean>(false);

    const handleOk = async (): Promise<void> => {
      let state: number = await handleSub();
      if (state == -1) return;
      confirmLoading.value = true;
      setTimeout(() => {
        confirmLoading.value = false;
        visible.value = false;
        message.success("密码修改成功");
        clearInputVal();
      }, 1000);
    };
    const clearInputVal = (): void => {
      for (const key in formState) {
        formState[key] = "";
      }
    };
    const handleSub = (): Promise<number> => {
      return new Promise((resolve, reject) => {
        console.log(formRef);
        formRef.value
          .validate()
          .then(() => {
            //没有接口
            resolve(1);
          })
          .catch((err: any) => {
            resolve(-1);
          });
      });
    };
    const handleLogout = (): void => {
      let { removeStoage } = handleStorage();
      router.push("/");
      removeStoage("token");
    };
    let show = ref<boolean>(true);

    return {
      collapsed,
      setCollapsed,
      ownmsg,
      visible,
      confirmLoading,
      handleOk,
      handleLogout,
      formState,
      formRef,
      rules,
      value,
      handleSub,
      show,
    };
  },
});
</script>

<style lang="less" scoped>
.headers {
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  .collapsed-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    opacity: 0.7;
    .icon {
      font-size: 20px;
    }
  }
  .avatar-box {
    .nickname {
      margin-left: 10px;
    }
    .fonts-color {
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
// .fade-enter-active {
//   transition: all 0.3s ease-out;
// }

// .fade-leave-active {
//   transition: all 0.3s ease-out;
// }

// .fade-enter-from,
// .fade-leave-to {
//   opacity: 0;
// }
</style>>

