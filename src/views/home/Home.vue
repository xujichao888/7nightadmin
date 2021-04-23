<template>
  <a-layout class="layout">
    <siderCompo/>
    <a-layout>
      <header-compo/>
      <contenCompo/>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {  Layout } from "ant-design-vue";
import { Router, useRouter } from "vue-router";
import { Store, useStore } from "vuex";
import headerCompo from '@/layout/header/index.vue'
import contenCompo from '@/layout/contents/index.vue'
import siderCompo from '@/layout/sider/index.vue'
export default defineComponent({
  name: "Home",
  components: {
    [Layout.name]: Layout,
    [Layout.Sider.name]: Layout.Sider,
    contenCompo,
    headerCompo,
    siderCompo
  },
  setup() {
    const store: Store<any> = useStore();
    const router: Router = useRouter();
    const collapsed = computed(() => store.state.collapsed);
    return {
      collapsed,
    };
  },
});
</script>
<style lang="less" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  background: chocolate;
  display: flex;
  .slider {
    height: 100vh;
  }
 
}
</style>
