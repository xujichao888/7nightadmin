<template>
     <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
          overflow: 'auto',
        }"
      >
        <router-view/>
      </a-layout-content>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import {Layout } from "ant-design-vue";
import {loginRTM,logoutRTM,sendTextMsg} from '@/hooks/handleRTM'
import { Store, useStore } from "vuex";

export default defineComponent({
    components:{
        [Layout.Content.name]:Layout.Content
    },
    setup(){
      let store:Store<any> = useStore()
      let ownmsg = computed(()=>store.state.ownmsg)
      console.log('ownmsg',ownmsg.value)
      loginRTM(ownmsg.value.id.toString())
      // setTimeout(()=>{
      //     sendTextMsg('11780',{}).then(res=>{
      //       console.log(res)
      //     })
      // },5000)
  
    }
})
</script>

<style lang="less" scoped>

</style>>
