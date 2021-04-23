<template>
     <a-layout-header class="headers">
        <div class="collapsed-box" @click="setCollapsed(!collapsed)">
          <MenuFoldOutlined class="icon" v-if="!collapsed"/>
          <MenuUnfoldOutlined class="icon" v-else/>
        </div>
      </a-layout-header>
</template>

<script lang='ts'>
import { computed, defineComponent } from "vue";
import {Layout} from "ant-design-vue";
import { Store, useStore } from "vuex";
import {
MenuUnfoldOutlined,
MenuFoldOutlined
} from "@ant-design/icons-vue";
import { handleStores, IhandleStore } from "@/hooks/handleStore";
export default defineComponent({
    components:{
        [Layout.Header.name]:Layout.Header,    
        MenuUnfoldOutlined,
        MenuFoldOutlined,
    },
    setup(){
        const store:Store<any> = useStore()
        const { setCollapsed }: IhandleStore = handleStores();
        const collapsed = computed(() => store.state.collapsed);
         return{
             collapsed,
             setCollapsed
         }
    }
})
</script>

<style lang="less" scoped>
     .headers{
    background: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    .collapsed-box{
      display: flex;
      align-items: center;
      opacity: 0.7;
      .icon{
        font-size: 20px;
      }
    }
  }
</style>>

