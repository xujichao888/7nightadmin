<template>
     <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
          overflow: 'auto'
        }"
      >
        <router-view/>
      </a-layout-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {Layout } from "ant-design-vue";
export default defineComponent({
    components:{
        [Layout.Content.name]:Layout.Content
    }
})
</script>

<style lang="less" scoped>

</style>>
