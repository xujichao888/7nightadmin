<template>
  <div class="input-container">
    <div class="titless">设置次数</div>
    <a-input-number
      id="inputNumber"
      v-model:value="inputNum"
      :min="0"
      style="width: 200px"
    />
    <a-button class="btn" type="primary" @click="handleChangeNum"
      >确定</a-button
    >
  </div>
  <a-table
    :dataSource="numLogRenderList"
    :columns="columns"
    :loading="loading"
    bordered
    :pagination="pagination"
    style="margin-top: 20px"
    @change="handlePaginationChange"
  />
</template>

<script lang='ts'>
import { useStore, Store } from "vuex";
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import { Button, InputNumber, message, Table } from "ant-design-vue";
import { http_friendlog, http_setfriendcount } from "@/assets/request/api";
import { handleStores } from "@/hooks/handleStore";
export default defineComponent({
  components: {
    [InputNumber.name]: InputNumber,
    [Button.name]: Button,
    [Table.name]: Table,
  },
  setup() {
    console.log("触发了");
    interface InumLogRenderList {
      key: string;
      time: string;
      type: string;
      allmsg: string;
      hasnum: string;
      setperson: string;
    }
    interface Ilogarr {
      numLogRenderList: InumLogRenderList[];
    }
    let store: Store<any> = useStore();
    let loading = ref<boolean>(true);
    let { setClickMsg, setUserListPropertyByType } = handleStores();
    let inputNum = ref<number>(0);
    let usermsg = computed(() => store.state.clickMsg); //获得点击的id
    inputNum.value = usermsg.value.availableNum;
    let numLogRenderState = reactive<Ilogarr>({
      numLogRenderList: [],
    });
    let pagination = reactive({
      //分页总数
      total: 0,
      pageSize:8,
      current: 1,
    });
    let columns = [
      {
        title: "时间",
        dataIndex: "time",
        key: "time",
        width: 200,
      },
      {
        title: "类型",
        dataIndex: "type",
        key: "type",
        width: 100,
      },
      {
        title: "详细情况",
        dataIndex: "allmsg",
        key: "allmsg",
        width: 100,
      },
      {
        title: "剩余次数",
        dataIndex: "hasnum",
        key: "hasnum",
        width: 100,
      },
      {
        title: "操作人",
        dataIndex: "setperson",
        key: "setperson",
        width: 100,
      },
    ];

    const handlePaginationChange = (paginationEL: any) => {
      let { current, pageSize } = paginationEL;
      console.log(pageSize)
      pagination.current = current;
      handleGetFriendLog(current);
    };
    const handleGetFriendLog = (page: number) => {
      loading.value = true;
      http_friendlog({
        userid: Number(usermsg.value.id),
        page,
        rows: pagination.pageSize,
      }).then((res: any) => {
        loading.value = false;
        //获得修改次数日志
        if (res.code == 0) {
          numLogRenderState.numLogRenderList = [];
          let { logs, total } = res.data;
          pagination.total = total;
          if(logs == null) return
          logs.forEach((item: any, index: number) => {
            let { addtime, id, info, val } = item;
            numLogRenderState.numLogRenderList.push({
              key: index + "",
              time: addtime,
              type: val > 0 ? "补次数" : "减次数",
              allmsg: val + "次",
              hasnum: "暂无字段",
              setperson: `暂无字段(${info.substr(0, 2)})`,
            });
          });
        } else {
        }
      });
    };
    handleGetFriendLog(1);
    const handleChangeNum = (): void => {
      //更改次数
      if (inputNum.value == null) {
          inputNum.value = usermsg.value.availableNum
        message.error("设置的次数只能是数字");
      } else {
        let rightsval = inputNum.value - usermsg.value.availableNum; //计算差值
        if (rightsval == 0) return;
        message.loading("修改中");
        http_setfriendcount({ rightsval, targetid: Number(usermsg.value.id) })
          .then((res: any) => {
            message.destroy();
            if (res.code == 0) {
              message.success("修改成功");
              setClickMsg({ ...usermsg.value, availableNum: inputNum.value });
              setUserListPropertyByType("availableNum", inputNum.value);
              pagination.current = 1;
              handleGetFriendLog(1);
            } else {
              message.error(res.msg);
            }
          })
          .catch((err: any) => {
            console.log("修改次数保存");
          });
      }
    };
    return {
      usermsg,
      inputNum,
      handleChangeNum,
      loading,
      pagination,
      handlePaginationChange,
      ...toRefs(numLogRenderState),
      columns,
    };
  },
});
</script>

<style lang="less" scoped>
.input-container {
  display: flex;
  align-items: center;
  .titless {
    margin-right: 20px;
  }
  .btn {
    margin-left: 20px;
  }
}
</style>