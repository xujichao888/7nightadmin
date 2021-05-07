<template>
  <div>{{ title }}</div>
  <div class="tag-box">
    <div
      class="tag-list"
      :class="{ active: item.select }"
      v-for="(item, index) in renderArr.value"
      :key="index"
      @click="handleActive(index)"
    >
      {{ item.val }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";

export default defineComponent({
  props: {
    renderArr: {
      type: Object,
      default: {},
    },
    sex: Number,
  },
  emits: ["changeState"],
  setup(props, ctx) {
    let title = ref<string>("");
    let { emit } = ctx;
    watchEffect(() => {
        switch (props.renderArr.tag) {
           
          case "freetime":
            title.value = "空闲时间";
            break;
          case "hobbystr":
            title.value = "兴趣爱好";
            break;
          case "mode":
            title.value = "约会方式";
            break;
          case "motion":
            title.value = "运动锻炼";
            break;
          case "food":
            title.value = "餐饮习惯";
            break;
          case "ment":
            title.value = "喜欢类型";
            break;
          case "travellocation":
            title.value = "最近想去";
            break;
          case "userdescribe":
            title.value = "自我描述";
            break;
        }
     
    });
    const handleActive = (index: number) => {
      emit("changeState", { type: props.renderArr.tag, idx: index });
    };
    return {
      title,
      handleActive,
    };
  },
});
</script>

<style lang="less" scoped>
.tag-box {
  display: flex;
  flex-wrap: wrap;
  .tag-list {
    border: 1px solid rgb(217, 217, 217);
    line-height: 0;
    padding: 12px 15px;
    margin: 5px;
    border-radius: 4px;
    color: #7c7c7c;
  }
  .active {
    border: 1px solid rgb(24, 144, 255);
    color: rgb(24, 144, 255);
  }
}
</style>