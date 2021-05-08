<template>
    <div>
        <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" :tab="InvitationTitle">
                <invitationList/>
                </a-tab-pane>
                <a-tab-pane key="2" :tab="FlopTitle">
                    Content of Tab Pane 2
                </a-tab-pane>
                <a-tab-pane key="3" :tab="FeedbackTitle">
                    Content of Tab Pane 3
                </a-tab-pane>
                    <a-tab-pane key="4" :tab="FeedbackTalkTitle">
                    Content of Tab Pane 3
                </a-tab-pane>
        </a-tabs>
    </div>

</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Tabs} from "ant-design-vue";
import invitationList from '@/components/invitationList.vue'
export default defineComponent({
    components:{
        [Tabs.name]:Tabs,
        [Tabs.TabPane.name]:Tabs.TabPane,
       invitationList
    },
    setup(){
        let activeKey = ref<string>('1');
        let InvitationTitle = ref<string>('邀约');
        let  FlopTitle = ref<string>('翻牌');
        let FeedbackTitle = ref<string>('反馈');
        let FeedbackTalkTitle = ref<string>('反馈评论')
        return{
            activeKey,
            InvitationTitle,
            FlopTitle,
            FeedbackTitle,
            FeedbackTalkTitle
        }
    }
})
</script>

<style lang="less" scoped>

</style>