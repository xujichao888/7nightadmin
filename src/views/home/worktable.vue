<template>
  <div class="containers">
    <div class="talklist">
      <div class="talklist-title">服务用户列表</div>
      <div class="talklist-content">
        <talklistCompo v-for="index in 20" :key="index" />
      </div>
    </div>
    <div class="talkcontainer">
        <talkpageCom />
    </div>
    <div class="searchuser">
        <searchUsers/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import talkpageCom from "@/components/talkpageCom.vue";
import talklistCompo from "@/components/talklistCompo.vue";
import searchUsers from '@/components/searchUsers.vue'
</script>

<style lang="less" scoped>
.containers {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  .talklist {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    flex: 1.5;
    border: 1px solid rgb(240, 240, 240);
    .talklist-title {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgb(250, 250, 250);
      border-bottom: 1px solid rgb(240, 240, 240);
    }
    .talklist-content {
      height: calc(100% - 52px);
      overflow: auto;
    }
  }
  .talkcontainer {
    height: 100%;
    flex: 3;
    border-right: 1px solid rgb(240, 240, 240);
    border-top: 1px solid rgb(240, 240, 240);
    border-bottom: 1px solid rgb(240, 240, 240);
  }
  .searchuser {
    flex: 4;
      height: 100%;
      box-sizing: border-box;
      padding: 20px;
         border-right: 1px solid rgb(240, 240, 240);
    border-top: 1px solid rgb(240, 240, 240);
    border-bottom: 1px solid rgb(240, 240, 240);
  }
}
</style>