<template>
  <div class="search-users" ref="fwidth">
    <div class="search-options">
      <a-input-group compact>
        <!-- <a-select
          style="width: 110px"
          allowClear
          placeholder="查询条件"
          @change="handleSelect($event, 'search')"
        >
          <a-select-option value="searchByid"> ID查询 </a-select-option>
        </a-select> -->
        <a-select
          style="width: 110px"
          allowClear
          placeholder="性别不限"
          @change="handleSelect($event, 'sex')"
        >
          <a-select-option value="1"> 男 </a-select-option>
          <a-select-option value="0"> 女 </a-select-option>
        </a-select>
        <a-select
          style="width: 110px"
          allowClear
          placeholder="会员等级不限"
          @change="handleSelect($event, 'level')"
        >
          <a-select-option value="0">非会员</a-select-option>
          <a-select-option value="1">金牌会员</a-select-option>
          <a-select-option value="2">钻石会员</a-select-option>
          <a-select-option value="3">vip本地</a-select-option>
          <a-select-option value="4">vip全球</a-select-option>
          <a-select-option value="5">直通车</a-select-option>
          <a-select-option value="6">私人订制</a-select-option>
        </a-select>
        <div>
          <a-input-search
            style="width: 200px; margin-left: 10px"
            placeholder="按ID搜索...."
            enter-button
            @search="handleSearchByOption"
            :loading="loading"
            allow-clear
          />
        </div>
      </a-input-group>
    </div>
    <div class="tabs-container">
      <a-tabs
        v-model:activeKey="activeKey"
        type="editable-card"
        style="height: 100%"
        hideAdd
        @edit="onEdit"
      >
        <a-tab-pane key="1" tab="列表" :closable="false">
          <div :style="{ height: tabHeight + 'px' }" class="list" >
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
                  <a-button
                    size="small"
                    @click="handleCheckUser(record)"
                    type="primary"
                    >查看详情</a-button
                  >
                </a-space>
              </template>
              <template #handletitle>
                <span> 操作 </span>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
       <a-tab-pane  v-for="(item) in tabPaneList" :key="item.key" :tab="item.tab">
          <div>123</div>
       </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Drawer,
  Select,
  Input,
  Tabs,
} from "ant-design-vue";
import { FolderAddOutlined } from "@ant-design/icons-vue";
import { httpuserlist } from "@/assets/request/api";
const QS = require("query-string");
export default defineComponent({
  components: {
    [Table.name]: Table,
    [Button.name]: Button,
    [Space.name]: Space,
    [Popconfirm.name]: Popconfirm,
    [Drawer.name]: Drawer,
    [Select.name]: Select,
    [Select.OptGroup.name]: Select.OptGroup,
    aSelectOption: Select.Option,
    [Input.name]: Input,
    [Input.Group.name]: Input.Group,
    [Input.Search.name]: Input.Search,
    [Tabs.name]: Tabs,
    [Tabs.TabPane.name]: Tabs.TabPane,
  },
  setup() {
    interface InumLogRenderList {
      key: string;
      userid: string;
      level: string;
      sex: string;
      nickname: string;
    }
    interface Ilogarr {
      numLogRenderList: InumLogRenderList[];
    }
    interface IsearchOptionsItem{
      sex?:number,
      level?:number,
      userid?:number,
    }
     interface IsearchOptions{
       searchOptions:IsearchOptionsItem
     }
     interface ItabPaneStateItem{
       key:string,
       tab:string
     }
     interface ItabPaneState{
       tabPaneList:ItabPaneStateItem[]
     }
    let loading = ref(false);
    let searchOptionsState = reactive<IsearchOptions>({
      searchOptions : {}
    })
    const activeKey = ref("1");
    const fwidth = ref();
    const tabHeight = ref(0);
    let pagination = reactive({
      //分页总数
      total: 0,
      pageSize: 11,
      current: 1,
    });
    let numLogRenderState = reactive<Ilogarr>({
      numLogRenderList: [],
    });
    let columns = [
      {
        title: "用户id",
        dataIndex: "userid",
        key: "userid",
        width: 100,
      },
      {
        title: "会员等级",
        dataIndex: "level",
        key: "level",
        width: 100,
      },
      {
        title: "性别",
        dataIndex: "sex",
        key: "sex",
        width: 100,
      },
      {
        title: "昵称",
        dataIndex: "nickname",
        key: "nickname",
        width: 100,
      },
      {
        slots: { title: "handletitle", customRender: "handle" },
        dataIndex: "handle",
        key: "handle",
        width: 100,
      },
    ];

    const tabPaneState = reactive<ItabPaneState>({
        tabPaneList : []
    })
    const handleSelect = (val:string,type:string) => {
          if(val){
              searchOptionsState.searchOptions[type]= Number(val) 
          }else{
             Reflect.deleteProperty(searchOptionsState.searchOptions,type)
          }
         console.log(searchOptionsState.searchOptions)
    };
    const handleSearchByOption = (val:string) => {
        handleSelect(val,'userid');
        handleGetuserlist();
    };
    const onEdit = (targetKey: string | MouseEvent, action: string)=>{
      let num = Number(targetKey as string)-2
      tabPaneState.tabPaneList.splice(num,1)
       let length = tabPaneState.tabPaneList.length;
      if(length>0){
        activeKey.value = num+1+''
      }else{
         activeKey.value = '1'
      }
    }
    const handleCheckUser = (recod:any)=>{
      console.log(recod)
      
       let {userid} = recod;
        let index = tabPaneState.tabPaneList.findIndex((item)=>{
          return item.tab == userid
      })
      if(index==-1){
          let length = tabPaneState.tabPaneList.length
         let key:string = length +2+''
        activeKey.value =key
        if(length<5){
           tabPaneState.tabPaneList.push({key,tab:userid+''})
        }else{
          tabPaneState.tabPaneList[length-1]={key,tab:userid+''}
        }
       
      }else{
        activeKey.value =tabPaneState.tabPaneList[index].key
      }
      
    }
    const handlePaginationChange = (paginationEl: any) => {
      let { current, pageSize } = paginationEl;
      pagination.current = current;
      pagination.pageSize = pageSize;
      handleGetuserlist();
    };
    const handleGetuserlist = () => {
      numLogRenderState.numLogRenderList=[]
      loading.value = true;
      let urlParams = QS.stringify({
        page: pagination.current,
        rows: pagination.pageSize,
      });
      httpuserlist(urlParams,searchOptionsState.searchOptions).then((res) => {
        loading.value = false;
        console.log(res);
        if (res.code == 0) {
          let { count, data } = res.data;
          pagination.total = count;
          if(data == null) return
          data.forEach((item: any, index: number) => {
            let { userid, level:beforLevel, sex, nickname } = item;
            let level=''
            switch(beforLevel){
              case '0':
                level = '非会员'
              break
               case '1':
                 level = '金牌会员'
              break
               case '2':
                  level = '钻石会员'
              break
               case '3':
                  level = 'vip本地'
              break
               case '4':
                  level = 'vip全球'
              break
               case '5':
                  level = '直通车'
              break
               case '6':
                  level = '私人订制'
              break
            }
            numLogRenderState.numLogRenderList.push({
              key: index + "",
              userid,
              level,
              sex:sex==0?'女':'男',
              nickname,
            });
          });
        }
      });
    };
    handleGetuserlist();
    onMounted(() => {
      setTimeout(() => {
        tabHeight.value = fwidth.value.offsetHeight - 40;
      });
    });
    return {
      activeKey,
      fwidth,
      tabHeight,
      pagination,
      columns,
      handleSelect,
      handleSearchByOption,
      handlePaginationChange,
      handleCheckUser,
      loading,
      handleGetuserlist,
      onEdit,
      ...toRefs(numLogRenderState),
      ...toRefs(tabPaneState),
    };
  },
});
</script>

<style lang="less" scoped>
.search-users {
  height: 100%;
  .search-options {
    height: 40px;
  }
}
.tabs-container {
  height: calc(100% - 50px);

  .list {
    overflow: auto;
  }
}
</style>