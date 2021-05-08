<template>
  <a-table
    :dataSource="numLogRenderList"
    :columns="columns"
    :loading="loading"
    :pagination="false"
    bordered
  >
    <template #id="{ text }">
      <a @click="handleServiceChange(text,'handleService')">{{ text }}</a>
    </template>
    <template #ID>
      <span> ID </span>
    </template>
    <template #handle="{ record }">
      <a-space>
        <a-button type="primary" size="small" @click="moveService(record)"
          >迁移客服</a-button
        >
        <a-button type="danger" size="small" @click="deleteService(record)"
          >删除客服</a-button
        >
      </a-space>
    </template>
    <template #handletitle>
      <span> 操作 </span>
    </template>
  </a-table>
  <a-drawer
    :title="drawTile"
    placement="right"
    :width="drawerWidth"
    :closable="true"
    v-model:visible="visible"
  >
    <setServiceMsg/>
    <subBar @closeDrawer="drawerClose" @submit="drawerSub" />
  </a-drawer>
</template>

<script lang='ts'>
import { useStore, Store } from "vuex";
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import setServiceMsg from '@/components/setServiceMsg.vue'
import {
  Button,
  InputNumber,
  message,
  Table,
  Space,
  Drawer,
} from "ant-design-vue";
import { http_servicelog } from "@/assets/request/api";
import { handleStores } from "@/hooks/handleStore";
import subBar from '@/components/subBar.vue'
export default defineComponent({
  components: {
    [InputNumber.name]: InputNumber,
    [Button.name]: Button,
    [Table.name]: Table,
    [Space.name]: Space,
    [Drawer.name]: Drawer,
    subBar,
    setServiceMsg,
  },
  setup() {
    interface InumLogRenderList {
      key: string;
      id: string;
      phone: string;
      nickname: string;
      serviceType: string;
    }
    interface Ilogarr {
      numLogRenderList: InumLogRenderList[];
    }
    let drawTile = ref<string>("");
    let drawerType:string =''; //判断抽屉类型
    let visible = ref<boolean>(false);
    let drawerWidth = ref<number>(0);
    let store: Store<any> = useStore();
    let loading = ref<boolean>(false);
    const ownmsg = computed(() => store.state.ownmsg);

    let numLogRenderState = reactive<Ilogarr>({
      numLogRenderList: [],
    });

    let columns = [
      {
        slots: { title: "ID", customRender: "id" },
        dataIndex: "id",
        key: "id",
        width: 100,
      },
      {
        title: "手机号",
        dataIndex: "phone",
        key: "phone",
        width: 100,
      },
      {
        title: "昵称",
        dataIndex: "nickname",
        key: "nickname",
        width: 100,
      },
      {
        title: "客服类型",
        dataIndex: "serviceType",
        key: "serviceType",
        width: 100,
      },
      {
        slots: { title: "handletitle", customRender: "handle" },
        dataIndex: "handle",
        key: "handle",
        width: 100,
      },
    ];

    const handleServiceChange = (id:string,type: string): void => {
      visible.value = true;
      switch (type) {
        case "handleService":
        drawerWidth.value=500;
          drawTile.value = "设置客服";
          break;
      }
    };
    const drawerClose =():void=>{
        visible.value=false
    }
    const drawerSub =():void=>{

    }
    const handleGetServiceList = (): void => {
      loading.value = true;
      http_servicelog({}).then((res: any) => {
        console.log(res);
        loading.value = false;
        if (res.code == 0 && res.data.data != null) {
          res.data.data.forEach((el: any, index: number) => {
            let { id, nickname, phone, name } = el;
            numLogRenderState.numLogRenderList.push({
              key: "" + index,
              id,
              nickname,
              phone,
              serviceType: name,
            });
          });
        } else {
          message.error(res.msg);
        }
      });
    };
    handleGetServiceList();

    return {
      loading,
      handleServiceChange,
      drawerWidth,
      drawTile,
      visible,
      drawerClose,
      drawerSub,
      ...toRefs(numLogRenderState),
      columns,
    };
  },
});
</script>

<style lang="less" scoped>
</style>