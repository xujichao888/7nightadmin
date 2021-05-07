<template>
  <div class="input-box">
    <div class="titles">筛选</div>
    <a-select style="width: 250px" allowClear placeholder="全部">
      <a-select-option value="searchByid"> 充值 </a-select-option>
      <a-select-option value="searchByPhone"> 开通会员 </a-select-option>
      <a-select-option value="searchByReg"> 加好友 </a-select-option>
      <a-select-option value="searchByLastLogin"> 邀约 </a-select-option>
      <a-select-option value="searchByLastLogin"> 补次数 </a-select-option>
    </a-select>
  </div>
  <a-table
    :dataSource="numLogRenderList"
    :columns="columns"
    :loading="loading"
    bordered
    :pagination="pagination"
    style="margin-top: 20px"
  />
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import { Select, Table,message } from "ant-design-vue";
import { Store, useStore } from "vuex";
import { http_propslogs } from "@/assets/request/api";
export default defineComponent({
  //select  @change="handleSelect($event, 'search')"
  // table   @change="handlePaginationChange"
  components: {
    [Table.name]: Table,
    [Select.name]: Select,
    aSelectOption: Select.Option,
  },
  setup() {
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
    let pagination = reactive({
      //分页总数
      total: 0,
      pageSize: 8,
      current: 1,
    });
    let usermsg = computed(() => store.state.clickMsg); 
    let loading = ref<boolean>(false);
    let numLogRenderState = reactive<Ilogarr>({
      numLogRenderList: [],
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


    const handleGetPropsLog=(page:number):void=>{
        loading.value=true;
        http_propslogs({userid:usermsg.value.id}).then((res:any)=>{
              loading.value=false;
            console.log(res)
            if(res.code==0){

            }else{
                message.error(res.msg)
            }
        })
    }
    handleGetPropsLog(1)
    return {
      columns,
      loading,
      ...toRefs(numLogRenderState),
    };
  },
});
</script>

<style lang="less" scoped>
.input-box {
  display: flex;
  align-items: center;
  .titles {
    margin-right: 20px;
  }
}
</style>