<template>
  <Select v-model:value="selectType" >
    <selectOption value="0">举报用户列表</selectOption>
    <selectOption value="1">举报房间列表</selectOption>
    <selectOption value="2">举报留言列表</selectOption>
  </Select>
<Select v-model:value="status" >
    <selectOption value="0">未处理</selectOption>
    <selectOption value="1">已处理</selectOption>
    <selectOption value="2">忽略</selectOption>
  </Select>
   <Button  type="primary">
        <template #icon>
            <SearchOutlined />
        </template>
          搜索
  </Button>
  <Table
    :dataSource="reportstate.reportdata"
    :columns="columns"
    :loading="loading"
    bordered
    :pagination="pagination"
    style="margin-top: 10px"
  >
    <template #handle="{ record }">
      <Space>
        <Button size="small" type="primary" @click="() => record"
          >审核通过</Button
        >
        <Button size="small" type="danger">审核拒绝</Button>
        <Button size="small">查看详情</Button>
      </Space>
    </template>
    <template #handletitle>
      <span> 操作 </span>
    </template>
  </Table>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Table, Button, Space, Select } from "ant-design-vue";
import { http_report } from "@/assets/request/api";
import {
  SearchOutlined,
} from "@ant-design/icons-vue";
let selectOption = Select.Option;

let reportstate = reactive({
  reportdata: [],
});
let pagination = reactive({
  //分页总数
  total: 0,
  pageSize: 8,
  current: 1,
});
let loading = ref(false);
let columns = [
  {
    title: "序号",
    dataIndex: "time",
    key: "time",
    width: 50,
  },
  {
    title: "发布时间",
    dataIndex: "type",
    key: "type",
    width: 100,
  },
  {
    title: "用户ID",
    dataIndex: "userid",
    key: "userid",
    width: 100,
  },
  {
    title: "投诉内容",
    dataIndex: "reportContent",
    key: "reportContent",
    width: 100,
  },
  {
    slots: { title: "handletitle", customRender: "handle" },
    dataIndex: "handle",
    key: "handle",
    width: 100,
  },
];
let status = ref("0");
let selectType = ref("0");
const handleGetreport = (): void => {
    console.log(selectType.value)
  http_report({
    page: pagination.current,
    rows: pagination.pageSize,
    type: Number(selectType.value),
    status: Number(status.value),
  }).then((res:any)=>{
      console.log(res)
  });
};
handleGetreport()
</script>

<style lang="less" scoped>
</style>