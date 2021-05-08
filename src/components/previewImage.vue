<template>

<transition name="fade">
       <div class="mask" v-if="show">
           
       </div>
 </transition>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    props:{
        show:Boolean
    }
})
</script>

<style lang="less" scoped>
    .mask{
        background: rgba(0,0,0,1);
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
    }
</style>