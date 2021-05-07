<template>
  <div class="avatar-select-box">
    <div class="blocklist" v-for="(item,index) in allavatar" :key="index" @click="handleSelectActive(index)">
      <img :src="item.img" :class="{active:item.select}">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props:{
    allavatar:Array
  },
  setup(props,ctx){
    let {emit} = ctx;
    const handleSelectActive = (idx:string):void=>{
      emit('changeSelectActive',idx)
    }
    return{
      handleSelectActive
    }
  }
})
</script>

<style lang="less" scoped>
    .avatar-select-box{
        width: 100%;
          display: flex;
          flex-wrap: wrap;
        .blocklist{
          width: 80px;
          height: 80px;
          box-sizing: border-box;
        
          img{
            width: 79px;
            display: block;
          }
           .active{
          border: 1px solid rgb(191, 191, 191);
          }
        }
       
    }
</style>