<template>
  <div class="container" v-if="isShowlist">
    <div class="search-box">
      <!-- <div class="search-typeboox">
        <a-select style="width: 120px" placeholder="全部" allowClear>
          <a-select-option value="ok">有效</a-select-option>
          <a-select-option value="notok">过期</a-select-option>
        </a-select>
        <a-select placeholder="全部" style="width: 120px" allowClear>
          <a-select-option value="ok">待审</a-select-option>
          <a-select-option value="notok">通过</a-select-option>
          <a-select-option value="notok">拒绝</a-select-option>
        </a-select>
        <a-button class="pisition-btn" type="primary">
          <template #icon>
            <SearchOutlined />
          </template>
          搜索
        </a-button>
      </div> -->
      <a-button class="pisition-btn" type="primary" @click="handleHideShow">
        <template #icon>
          <PlusOutlined />
        </template>
        发布
      </a-button>
    </div>
    <a-table
      :dataSource="numLogRenderList"
      :columns="columns"
      :loading="loading"
      bordered
      :pagination="pagination"
      @change="handlePaginationChange"
    >
      <template #handle="{ record }">
        <a-space>
          <a-button size="small" type="primary" @click="() => record"
            >审核通过</a-button
          >
          <a-button size="small" type="danger">审核拒绝</a-button>
          <a-button size="small">查看详情</a-button>
        </a-space>
      </template>
      <template #handletitle>
        <span> 操作 </span>
      </template>
    </a-table>
  </div>
  <div v-else class="userlist">
    <div class="search-box">
      <div class="search-typeboox">
        <a-select style="width: 120px" placeholder="性别" allowClear>
          <a-select-option value="ok">男</a-select-option>
          <a-select-option value="notok">女</a-select-option>
        </a-select>
        <a-select placeholder="级别" style="width: 120px" allowClear>
          <a-select-option value="0"> 非会员 </a-select-option>
          <a-select-option value="1"> 金牌 </a-select-option>
          <a-select-option value="2">钻石</a-select-option>
          <a-select-option value="3">vip本地</a-select-option>
          <a-select-option value="4">VIP全球</a-select-option>
          <a-select-option value="5">直通车</a-select-option>
          <a-select-option value="6">私人定制</a-select-option>
        </a-select>
        
        <a-button class="pisition-btn" type="primary">
          <template #icon>
            <SearchOutlined />
          </template>
          搜索
        </a-button>
      </div>
      <a-button class="pisition-btn" type="primary" @click="handleHideShow">
        <template #icon>
          <LeftOutlined />
        </template>
        返回
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { Table, Button, Select, Space } from "ant-design-vue";
import {
  PlusOutlined,
  SearchOutlined,
  LeftOutlined,
} from "@ant-design/icons-vue";
import { http_invitation } from "@/assets/request/api";
import { Iinvitation } from "@/assets/request/typing";
import { provinceDatas } from "@/utils/provinceData";
export default defineComponent({
  components: {
    [Table.name]: Table,
    [Button.name]: Button,
    [Select.name]: Select,
    [Space.name]: Space,
    aSelectOption: Select.Option,
    PlusOutlined,
    SearchOutlined,
    LeftOutlined,
  },
  setup() {
    interface InumLogRenderList {
      key: string;
      sortNum: string;
      subTime: string;
      userid: string;
      checkState: string;
      checkStateCode: string;
    }
    interface Ilogarr {
      numLogRenderList: InumLogRenderList[];
    }
    let isShowlist = ref<boolean>(true);
    let msgIsok = ref<string>("");
    let numLogRenderState = reactive<Ilogarr>({
      numLogRenderList: [],
    });
    let loading = ref<boolean>(false);
    let pagination = reactive({
      //分页总数
      total: 0,
      pageSize: 10,
      current: 1,
    });
    let columns = [
      {
        title: "序号",
        dataIndex: "sortNum",
        key: "sortNum",
        width: 100,
      },
      {
        title: "发布时间",
        dataIndex: "subTime",
        key: "subTime",
        width: 100,
      },
      {
        title: "用户id",
        dataIndex: "userid",
        key: "userid",
        width: 100,
      },
      {
        title: "审核状态",
        dataIndex: "checkState",
        key: "checkState",
        width: 100,
      },
      {
        slots: { title: "handletitle", customRender: "handle" },
        dataIndex: "handle",
        key: "handle",
        width: 100,
      },
    ];

    const getInvitationMsg = (pageobj: Iinvitation): void => {
      loading.value = true;
      //获得邀约列表
      http_invitation(pageobj).then((res: any) => {
        console.log(res);
        loading.value = false;
        if (res.code == 0 && res.data != null) {
          let { data, count } = res.data;
          pagination.total = count;
          data.forEach((item: any, index: number) => {
            let { addtime, id, status, userid } = item;
            let checkState = "";
            switch (status) {
              case "0":
                checkState = "未审核";
                break;
              case "1":
                checkState = "用户通过";
                break;
              case "2":
                checkState = "用户拒绝";
                break;
              case "-1":
                checkState = "客服通过";
                break;
              case "-2":
                checkState = "客服拒绝";
                break;
            }
            numLogRenderState.numLogRenderList.push({
              key: index + "",
              sortNum: id,
              subTime: addtime,
              userid: userid,
              checkState,
              checkStateCode: status,
            });
          });
        }
      });
    };
    getInvitationMsg({
      page: pagination.current,
      rows: pagination.pageSize,
      type: 1,
    });
    const handlePaginationChange = (paginationEL: {
      current: any;
      pageSize: any;
    }): void => {
      let { current, pageSize } = paginationEL;
      console.log(pageSize);
      pagination.current = current;
      getInvitationMsg({
        page: pagination.current,
        rows: pagination.pageSize,
        type: 1,
      });
    };
    const handleHideShow = (): void => {
      isShowlist.value = !isShowlist.value;
    };
    return {
      msgIsok,
      pagination,
      columns,
      loading,
      isShowlist,
      ...toRefs(numLogRenderState),
      handleHideShow,
      handlePaginationChange,
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .search-box {
    display: flex;
    justify-content: flex-end;
    height: 50px;
  }
}
.userlist {
  .search-box {
    display: flex;
    justify-content: space-between;
    height: 70px;
  }
}
.fade-enter-active {
  transition: all 1s ease-out;
}

.fade-leave-active {
  transition: all 1s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate3d(360deg);
}
</style>