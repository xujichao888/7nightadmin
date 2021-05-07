<template>
   <div class="submit-box">
    <a-button :style="{ marginRight: '8px' }" @click="handleCloseDrawer">
      取消
    </a-button>
    <a-button type="primary" @click="onSubmit"> 确认 </a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {Button} from 'ant-design-vue'
export default defineComponent({
    components:{
        [Button.name]:Button
    },
    setup(props,ctx){
        let {emit} = ctx
        const handleCloseDrawer = ():void=>{
            emit('closeDrawer')
        }
        const onSubmit = ():void=>{
            emit('submit')
        }
        return{
            handleCloseDrawer,
            onSubmit
        }
    }
})
</script>

<style lang="less" scoped>
.submit-box {
  background: #fff;
  display: flex;
  height: 60px;
  width: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  border-top: 1px solid #e9e9e9;
  align-items: center;
  justify-content: flex-end;
  padding-right: 30px;
}
</style>