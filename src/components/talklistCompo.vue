<template>
    <div class="some-list">
        <div class="avatar-boxs">
          <img src="https://cloud-img.7nightapp.com/girl/girl2.png">
        </div>
        <div class="some-list-textbox">
          <div class="ids">id:123</div>
          <div class="nicknames">测试名字</div>
          <div class="alias">(备注)</div>
        </div>
    </div>
</template>

<script lang="ts">


import { defineComponent } from 'vue';

 export default defineComponent({

 })
</script>

<style lang="less" scoped>
  .some-list{
    height: 60px;
    border-bottom: 1px solid rgb(240, 240, 240);
    display: flex;
    align-items: center;
    padding-left: 20px;
    .avatar-boxs{
      width: 30px;
      height: 30px;
      background: rgb(240, 240, 240);
      border-radius: 40px;
      margin-right: 5px;
      img{
        width: 30px;
        height: 30px;
        display: block;
        border-radius: 40px;
      }
    }
    .some-list-textbox{
      display: flex;
      .nicknames{
        margin: 0 5px;
      }
    }
  }
</style>