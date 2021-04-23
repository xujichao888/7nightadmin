<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    class="container"
  >
    <div class="logo">
        <img src="@/assets/images/logo.png" class="logoimg" >
        <div v-show="!collapsed"> 七夜业务管理平台</div>
    </div>
    <a-menu
      :default-selected-keys="['vip']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      :open-keys="openKEY"
      @openChange="onOpenChange"
      @select="handleSelect"
    >
      <a-menu-item key="vip">
        <CarryOutOutlined />
        <span>会员管理</span>
      </a-menu-item>

      <a-menu-item key="comstomer">
        <AppstoreOutlined />
        <span>客服管理</span>
      </a-menu-item>

      <a-sub-menu key="content">
        <template v-slot:title>
          <DatabaseOutlined />
          <span>内容管理</span>
        </template>
        <a-menu-item key="1"> Option 5 </a-menu-item>
        <a-menu-item key="2"> Option 6 </a-menu-item>
        <a-menu-item key="3"> Option 7 </a-menu-item>
        <a-menu-item key="4"> Option 8 </a-menu-item>
      </a-sub-menu>

      <a-menu-item key="report">
        <IdcardOutlined />
        <span>举报管理</span>
      </a-menu-item>

      <a-sub-menu key="websitSetting">
        <template v-slot:title>
          <DatabaseOutlined />
          <span>平台配置</span>
        </template>
        <a-menu-item key="7"> Option 5 </a-menu-item>
        <a-menu-item key="8"> Option 6 </a-menu-item>
        <a-menu-item key="9"> Option 7 </a-menu-item>
        <a-menu-item key="10"> Option 8 </a-menu-item>
      </a-sub-menu>

      <a-menu-item key="log">
        <SolutionOutlined />
        <span>操作日志</span>
      </a-menu-item>

      <a-sub-menu key="admins">
        <template v-slot:title>
          <TeamOutlined />
          <span>管理员</span>
        </template>
        <a-menu-item key="11">管理员列表</a-menu-item>
        <a-menu-item key="12">权限列表 </a-menu-item>
        <a-menu-item key="13"> 新建管理员 </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { computed, defineComponent, reactive,toRefs} from "vue";
import { Layout, Menu } from "ant-design-vue";
import { Store, useStore } from "vuex";
import {
  CarryOutOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  IdcardOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons-vue";
interface Iopenkey {
    openKEY:string[]
}
export default defineComponent({
  components: {
    [Layout.Sider.name]: Layout.Sider,
    [Menu.Item.name]: Menu.Item,
    [Menu.name]: Menu,
    [Menu.SubMenu.name]: Menu.SubMenu,
    CarryOutOutlined,
    AppstoreOutlined,
    DatabaseOutlined,
    IdcardOutlined,
    SolutionOutlined,
    TeamOutlined
  },
  setup() {
    const store: Store<any> = useStore();
    const collapsed = computed(() => store.state.collapsed);
    const openState = <Iopenkey>reactive({
        openKEY:['']
    });
    const onOpenChange = (opens: string[]) => {
      openState.openKEY[0]=opens[opens.length-1];
    };
    const handleSelect = (item:any)=>{
       let {key} = item;
       console.log(key)
    }
    return {
      collapsed,
      ...toRefs(openState),
      onOpenChange,
      handleSelect
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  .logo {
      height: 64px;
      display: flex;
      align-items: center;
      padding-left: 24px;
      color: #ffffffa6;
    .logoimg{
        width: 20px;
        height: 20px;
        display: block;
        margin-right: 15px;
    }
  }
}
</style>>

