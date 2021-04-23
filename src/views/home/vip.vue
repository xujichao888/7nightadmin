<template>
  <div>
    <a-drawer
      :title="drawerTitle"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="handleCloseDrawer"
    >
    </a-drawer>
    <div class="input-box">
      <a-input-group compact>
        <a-select style="width: 150px" allowClear placeholder="查询条件不限" @change="handleSelect($event,'search')">
          <a-select-option value="searchByid"> ID查询 </a-select-option>
          <a-select-option value="searchByPhone"> 手机号查询 </a-select-option>
          <a-select-option value="searchByReg"> 注册时间查询 </a-select-option>
          <a-select-option value="searchByLastLogin"> 最后登录时间 </a-select-option>
        </a-select>
        <a-select style="width: 120px" allowClear placeholder="性别不限"  @change="handleSelect($event,'sex')">
          <a-select-option value="1"> 男 </a-select-option>
          <a-select-option value="0"> 女 </a-select-option>
        </a-select>
        <a-select style="width: 120px" allowClear placeholder="设备不限" @change="handleSelect($event,'source')">
          <a-select-option value="phone"> 苹果登录 </a-select-option>
          <a-select-option value="wechat"> 微信登录 </a-select-option>
        </a-select>
        <a-select style="width: 150px" allowClear placeholder="会员等级不限" @change="handleSelect($event,'level')">
          <a-select-option value="0">非会员</a-select-option>
          <a-select-option value="1">金牌会员</a-select-option>
          <a-select-option value="2">钻石会员</a-select-option>
          <a-select-option value="3">vip本地</a-select-option>
          <a-select-option value="4">vip全球</a-select-option>
          <a-select-option value="5">直通车</a-select-option>
           <a-select-option value="6">私人订制</a-select-option>
        </a-select>
        <a-select style="width: 120px" allowClear placeholder="对应客服" @change="handleSelect($event,'serviceid')" @focus="handleCumstomerFocus($event,'cumstomer')">
          <a-select-option :value="item.id" v-for="(item,index) in customerList" :key="index">
            {{item.id}}
          </a-select-option>
        </a-select>
        <a-input-search
          style="width: 250px;margin-left:10px"
          placeholder="搜索...."
          enter-button
          @search="handleSearchByOption"
          :loading="loading"
          allow-clear
        />
      </a-input-group>
    </div>

    <a-table
      :columns="columns"
      bordered
      :data-source="userListArr"
      @change="handleTableChange"
      :pagination="pagination"
      :loading="loading"
    >
      <template v-slot:id="text">
        <a @click="handleDrawer('id')">{{ text.text }}</a>
      </template>
      <template v-slot:availableMoney="text">
        <a>{{ text.text }}</a>
      </template>
      <template v-slot:wechatLogin="text">
        <CheckCircleOutlined v-if="text.text == '1'" class="icons" />
        <StopOutlined v-else class="stop" />
      </template>
      <template v-slot:appleLogin="text">
        <CheckCircleOutlined v-if="text.text == '1'" class="icons" />
        <StopOutlined v-else class="stop" />
      </template>
      <template v-slot:availableNum="text">
        <a>{{ text.text }}</a>
      </template>
      <template v-slot:setting>
        <a-space>
          <a-popconfirm
            title="确认冻结该用户吗?"
            ok-text="确认"
            cancel-text="取消"
          >
            <a-button type="danger" size="small">冻结</a-button>
          </a-popconfirm>
          <a-popconfirm
            title="确认提升为客服吗?"
            ok-text="确认"
            cancel-text="取消"
          >
            <a-button type="primary" size="small">提升客服</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { httpcustomer, httpuserlist } from "@/assets/request/api";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Drawer,
  Select,
  Input,
  Layout,
} from "ant-design-vue";
import { IuserList } from "@/assets/request/typing";
import { columns } from "@/utils/userListColums";
import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons-vue";
import { nanoid } from "nanoid";
import { DRAWERTITLE, VIPLEVEL } from "./vipTyping";
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
    [Layout.name]: Layout,
    CheckCircleOutlined,
    StopOutlined,
  },
  setup() {
    let pages = ref<number>(1);
    let rows = ref<number>(10);
    let loading = ref<boolean>(false); //列表加载开关
    let search = ref<string>(""); //搜索框文字
    let visible = ref<boolean>(false); //抽屉开关
    let drawerTitle = ref<string>(""); //抽屉标题
    let searchType:string | undefined = ''; //搜索条件'
    let searchTypeForHTTP:IuserList = {}
    let mangSelectobj={};//筛选
    let customerstate = reactive({ //客服列表
       customerList:[]
    })
    let pagination = reactive({ //分页总数
      total: 0,
    });
    let renderUserMsg = reactive({ //会员列表渲染数组
      count: 0,
      userListArr: [],
    });
    const userListObj = { //第一次请求query
      page: pages.value,
      rows: rows.value,
    };



    //获得用户列表
    const getUserListByHTTP = async (
      query: string,
      obj: IuserList
    ): Promise<void> => {
      loading.value = true;
      console.log(obj)
      let result = await httpuserlist(query, obj);
      let {data: { count, data }} = result
      data= data==null?[]:data;
      let arr: any = [];
      let leverArr: string[] = [
        VIPLEVEL.LEVEL0,
        VIPLEVEL.LEVEL1,
        VIPLEVEL.LEVEL2,
        VIPLEVEL.LEVEL3,
        VIPLEVEL.LEVEL4,
        VIPLEVEL.LEVEL5,
        VIPLEVEL.LEVEL6,
      ];
      data.forEach((item: any, index: number) => {
        let {
          userid,
          username: tel,
          source,
          sex,
          level: vipLevel,
          existingcount: availableMoney,
          friendcount: { actualval, useval },
          serviceid: customer,
          cumulativecount: allPayNum,
          regtime: setInTime,
          logintime: lastLoginTime,
        } = item;
        vipLevel = leverArr[vipLevel];
        let obj = {
          id:userid,
          key: index + 1 + "",
          tel,
          wechatLogin: source == "wechat" ? "1" : "0",
          appleLogin: source == "phone" ? "1" : "0",
          sex: sex == "1" ? "男" : "女",
          vipLevel,
          availableMoney,
          availableNum: actualval - useval,
          allPayNum,
          customer,
          setInTime,
          lastLoginTime,
          keyid: nanoid(),
        };
        arr.push(obj);
      });
      loading.value = false;
      renderUserMsg.userListArr = arr;
      renderUserMsg.count = count;
      pagination.total = count;
    };
    //翻页
    const handleTableChange = (pagination: any) => {
      let { current, pageSize } = pagination;
      const stringified = QS.stringify({ page: current, rows: pageSize });
      getUserListByHTTP(stringified, searchTypeForHTTP);
    };
    //抽屉打开
    const handleDrawer = (type: string): void => {
      console.log(type);
      visible.value = true;
      switch (type) {
        case "id":
          drawerTitle.value = DRAWERTITLE.IDTITLE;
          break;
        case "availableMoney":
          drawerTitle.value = DRAWERTITLE.AVAILABLEMONEY;
          break;
        case "setNum":
          drawerTitle.value = DRAWERTITLE.SETNUM;
          break;
      }
    };
    const handleSelect=(value:string,type:string )=>{ //下拉选择
        switch (type) {
        case "search":
          searchType= value;
          console.log(searchType)
          break;
        default:
         if(value!==undefined){
            const changeValue:string | number = type=='sex' || type == 'level' || type == 'serviceid'?parseInt(value):value
            Reflect.set(mangSelectobj,type,changeValue)
            
         }else{
          
           Reflect.deleteProperty(mangSelectobj,type)
          
         } 
          break;
      }
    }
    const handleCumstomerFocus = async (open:MouseEvent,type:string):Promise<void>=>{ //拉取客服列表
      switch(type){
        case 'cumstomer':
                if(customerstate.customerList.length>0)return;
                 let {data:{data}}=await httpcustomer({})
                 customerstate.customerList = data;
                 console.log(customerstate.customerList)
          break
      }
    }
    const handleSearchByOption =async (searchStr:string)=>{ //搜索按钮callback

       searchTypeForHTTP={}
      if(searchType!=undefined && searchType!='' && searchStr.trim().length!=0){
        switch(searchType){
          case 'searchByid':
            Reflect.set(searchTypeForHTTP,'userid',parseInt(searchStr))
            break;
          case 'searchByPhone':
            Reflect.set(searchTypeForHTTP,'phone',searchStr)
            break;
          case 'searchByReg':
            Reflect.set(searchTypeForHTTP,'eregtime',searchStr)
            break;
          case 'searchByLastLogin':
            Reflect.set(searchTypeForHTTP,'elogintime',searchStr)
            break;
        }
      }
      searchTypeForHTTP={...searchTypeForHTTP,...mangSelectobj}
      console.log(searchTypeForHTTP)
      getUserListByHTTP( QS.stringify({ page: userListObj.page, rows: userListObj.rows }),searchTypeForHTTP)
     
    }
    const handleCloseDrawer = (): void => { //关闭抽屉
      visible.value = false;
    };
    //第一次进入时调用拉取用户列表
    getUserListByHTTP(
      QS.stringify({ page: userListObj.page, rows: userListObj.rows }),
      {}
    );
    return {
      pages,
      rows,
      search,
      columns,
      handleTableChange,
      handleDrawer,
      handleCloseDrawer,
      handleSelect,
      handleCumstomerFocus,
      handleSearchByOption,
      pagination,
      loading,
      visible,
      drawerTitle,
      ...toRefs(renderUserMsg),
      ...toRefs(customerstate)
    };
  },
});
</script>

<style lang="less" scoped>
&:deep(.ant-input) {
  padding: 5px 11px;
}
.icons {
  font-size: 20px;
  color: green;
}
.stop {
  font-size: 20px;
  color: red;
}
.input-box {
  margin-bottom: 20px;
}
</style>>

