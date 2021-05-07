<template>
     <a-layout-header class="headers">
        <div class="collapsed-box">
          <div  @click="setCollapsed(!collapsed)">
             <MenuFoldOutlined class="icon" v-if="!collapsed"/>
            <MenuUnfoldOutlined class="icon" v-else/>
          </div>
          <div class="avatar-box">
             <a-dropdown>
               <div>
                  <a-avatar size="large" :src="ownmsg.avatarimg">
                    <template #icon>
                      <UserOutlined />
                    </template>
                  </a-avatar>
                  <span class="nickname">{{ownmsg.nickname}}</span>
               </div>
                 <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <LockOutlined style="color: rgba(0, 0, 0, 0.65)"/>
                        <span style="color: rgba(0, 0, 0, 0.65)">修改密码</span>
                    </a-menu-item>
                    <a-menu-item>
                        <LogoutOutlined />
                         <span style="color: rgba(0, 0, 0, 0.65)">退出登录</span>
                      </a-menu-item>
                  </a-menu>
                     </template>
             </a-dropdown>
          </div>
        </div>
      </a-layout-header>
</template>

<script lang='ts'>
import { computed, defineComponent } from "vue";
import { Layout, Avatar, Dropdown, Menu } from "ant-design-vue";
import { Store, useStore } from "vuex";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LockOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import { handleStores, IhandleStore } from "@/hooks/handleStore";
import { Iownmsg } from "@/store/storeTyping";
export default defineComponent({
  components: {
    [Layout.Header.name]: Layout.Header,
    [Dropdown.name]: Dropdown,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Avatar.name]: Avatar,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    LockOutlined,
    LogoutOutlined,
  },
  setup() {
    console.log('headersetup')
    const store: Store<any> = useStore();
    const { setCollapsed }: IhandleStore = handleStores();
    const collapsed = computed(() => store.state.collapsed);
    const ownmsg = computed(()=>store.state.ownmsg);
    return {
      collapsed,
      setCollapsed,
      ownmsg,
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
  .avatar-box{
    .nickname{
      margin-left: 10px;
    }
    .fonts-color{
      
       color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>>

