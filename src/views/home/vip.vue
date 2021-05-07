<template>
  <div>
    <a-drawer
      :title="drawerTitle"
      :width="drawerWidth"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="handleCloseDrawer"
    >
      <setUserMsg v-if="clickDrawerCheck == 'id'" @closeDrawer="handleCloseDrawer"/>
      <set-nums v-if="clickDrawerCheck == 'setNum' "/>
      <rechargeLog v-if="clickDrawerCheck == 'availableMoney' " />
    </a-drawer>
    <div class="input-box">
      <a-input-group compact>
        <a-select
          style="width: 150px"
          allowClear
          placeholder="查询条件不限"
          @change="handleSelect($event, 'search')"
        >
          <a-select-option value="searchByid"> ID查询 </a-select-option>
          <a-select-option value="searchByPhone"> 手机号查询 </a-select-option>
          <a-select-option value="searchByReg"> 注册时间查询 </a-select-option>
          <a-select-option value="searchByLastLogin">
            最后登录时间
          </a-select-option>
        </a-select>
        <a-select
          style="width: 120px"
          allowClear
          placeholder="性别不限"
          @change="handleSelect($event, 'sex')"
        >
          <a-select-option value="1"> 男 </a-select-option>
          <a-select-option value="0"> 女 </a-select-option>
        </a-select>
        <a-select
          style="width: 120px"
          allowClear
          placeholder="设备不限"
          @change="handleSelect($event, 'source')"
        >
          <a-select-option value="phone"> 苹果登录 </a-select-option>
          <a-select-option value="wechat"> 微信登录 </a-select-option>
        </a-select>
        <a-select
          style="width: 150px"
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
        <a-select
          style="width: 120px"
          allowClear
          placeholder="对应客服"
          @change="handleSelect($event, 'serviceid')"
          @focus="handleCumstomerFocus($event, 'cumstomer')"
        >
          <a-select-option
            :value="item.id"
            v-for="(item, index) in customerList"
            :key="index"
          >
            {{ item.id }}
          </a-select-option>
        </a-select>
        <div>
          <div
            v-if="
              searchType == 'searchByReg' || searchType == 'searchByLastLogin'
            "
          >
            <DatePicker
              style="margin-left: 10px"
              :locale="locale"
              @change="handleDateSelect"
            ></DatePicker>
            <a-button type="primary" @click="handleSearchByOption(timeArr)">
              <SearchOutlined />
            </a-button>
          </div>
          <a-input-search
            v-else
            style="width: 250px; margin-left: 10px"
            placeholder="搜索...."
            enter-button
            @search="handleSearchByOption"
            :loading="loading"
            allow-clear
          />
        </div>
      </a-input-group>
    </div>

    <a-table
      :columns="columns"
      bordered
      :data-source="renderUserList"
      @change="handleTableChange"
      :pagination="pagination"
      :loading="loading"
    >
      <template v-slot:id="text">
        <a @click="handleDrawer('id', text)">{{ text.text }}</a>
      </template>
      <template v-slot:availableMoney="text">
        <a @click="handleDrawer('availableMoney', text)">{{ text.text }}</a>
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
        <a @click="handleDrawer('setNum', text)">{{ text.text }}</a>
      </template>
      <template v-slot:setting="text">
        <a-space>
          <a-popconfirm
            title="确认冻结该用户吗?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="handleFrozen(text.record.status,text.record.id)"
          >
          
            <a-button type="danger" size="small">{{text.record.status==0?'冻结':'解冻'}}</a-button>
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
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import { computed, defineComponent, reactive, ref, toRefs, watch, watchEffect } from "vue";
import { httpcustomer, httpuserlist, http_frozen } from "@/assets/request/api";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Drawer,
  Select,
  Input,
  Layout,
  DatePicker,
} from "ant-design-vue";
import { IuserList } from "@/assets/request/typing";
import { columns } from "@/utils/userListColums";
import {
  CheckCircleOutlined,
  StopOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import { nanoid } from "nanoid";
import { DRAWERTITLE, DRAWER_SELECT, VIPLEVEL } from "./vipTyping";
const QS = require("query-string");
import setUserMsg from "@/components/setUserMsg.vue";
import {handleStores,IhandleStore} from '@/hooks/handleStore';
import setNums from '@/components/setNumCompo.vue';
import rechargeLog from '@/components/rechargeLog.vue'
import {Store,useStore} from 'vuex'
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
    DatePicker: DatePicker.RangePicker,
    [Layout.name]: Layout,
    CheckCircleOutlined,
    StopOutlined,
    SearchOutlined,
    setUserMsg,
    setNums,
    rechargeLog
  },
  setup() {
    let pages = ref<number>(1);
    let rows = ref<number>(10);
    let loading = ref<boolean>(false); //列表加载开关
    let search = ref<string>(""); //搜索框文字
    let visible = ref<boolean>(false); //抽屉开关
    let drawerTitle = ref<string>(""); //抽屉标题
    let clickDrawerCheck = ref<string>(""); //点击了哪个抽屉
    let searchType = ref<string | undefined>(""); //搜索条件'
    let drawerWidth = ref<number>(500); //1级抽屉宽度
    let {setClickMsg,saveUserList}:IhandleStore = handleStores() //解构hooks方法
    let store:Store<any> = useStore();
    let renderUserList = computed(()=>store.state.userLists)
    let locals = reactive({
      locale,
    });
    let drawerSelectState = reactive({
      //枚举抽屉
      id: DRAWER_SELECT.ID,
      availableMoney: DRAWER_SELECT.AVAILABLEMONEY,
      setNum: DRAWER_SELECT.SETNUM,
    });
    let timeArr = ref<string[]>([]); //时间选择
    let searchTypeForHTTP: IuserList = {};
    let mangSelectobj = {}; //筛选
    let customerstate = reactive({
      //客服列表
      customerList: [],
    });
    let pagination = reactive({
      //分页总数
      total: 0,
      current:1,
    });
    let renderUserMsg = reactive({
      //会员列表渲染数组
      count: 0,
 
    });
    const userListObj = {
      //第一次请求query
      page: pages.value,
      rows: rows.value,
    };

    //获得用户列表
    const getUserListByHTTP = async (
      query: string,
      obj: IuserList
    ): Promise<void> => {
      loading.value = true;
      let result = await httpuserlist(query, obj);
      let {
        data: { count, data },
      } = result;
      data = data == null ? [] : data;
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
          state,
          status,
        } = item;
        vipLevel =
          sex === "1"
            ? leverArr[vipLevel]
            : status === "1"
            ? "已认证"
            : "未认证";
        let obj = {
          id: userid,
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
          status,
          keyid: nanoid(),
        };
        arr.push(obj);
      });
      loading.value = false;
      //renderUserMsg.userListArr = arr;
      saveUserList(arr)
      renderUserMsg.count = count;
      pagination.total = count;
      let {page} = QS.parse(query)
      pagination.current = parseInt(page as string);
    };
    //翻页
    const handleTableChange = (paginationEL: any) => {
      let { current, pageSize } = paginationEL;
      const stringified = QS.stringify({ page: current, rows: pageSize });
      pagination.current = current
      getUserListByHTTP(stringified, searchTypeForHTTP);
    };
    //抽屉打开
    const handleDrawer = (type: string, check: any): void => {
      let {
        record,
      } = check;
      setClickMsg(record);
      clickDrawerCheck.value = type;
      visible.value = true;
      switch (type) {
        case DRAWER_SELECT.ID:
          drawerWidth.value = 500;
          drawerTitle.value = DRAWERTITLE.IDTITLE;
          break;
        case DRAWER_SELECT.AVAILABLEMONEY:
          drawerWidth.value = 600;
          drawerTitle.value = DRAWERTITLE.AVAILABLEMONEY;
          break;
        case DRAWER_SELECT.SETNUM:
          drawerWidth.value = 700;
          drawerTitle.value = DRAWERTITLE.SETNUM;
          break;
      }
    };
    const handleSelect = (value: string, type: string) => {
      //下拉选择
      switch (type) {
        case "search":
          searchType.value = value;
          timeArr.value = [];
          break;
        default:
          if (value !== undefined) {
            const changeValue: string | number =
              type == "sex" || type == "level" || type == "serviceid"
                ? parseInt(value)
                : value;
            Reflect.set(mangSelectobj, type, changeValue);
          } else {
            Reflect.deleteProperty(mangSelectobj, type);
          }
          break;
      }
    };
    const handleCumstomerFocus = async (
      open: MouseEvent,
      type: string
    ): Promise<void> => {
      //拉取客服列表
      switch (type) {
        case "cumstomer":
          if (customerstate.customerList.length > 0) return;
          let {
            data: { data },
          } = await httpcustomer({});
          customerstate.customerList = data;
          break;
      }
    };
    const handleSearchByOption = async (searchStr: string | string[]) => {
    
      //搜索按钮callback
      searchTypeForHTTP = {};
      if (Array.isArray(searchStr)) {
        switch (searchType.value) {
          case "searchByReg":
            if (searchStr[0] && searchStr[1]) {
              Reflect.set(searchTypeForHTTP, "sregtime", searchStr[0]);
              Reflect.set(searchTypeForHTTP, "eregtime", searchStr[1]);
            }
            break;
          case "searchByLastLogin":
            if (searchStr[0] && searchStr[1]) {
              Reflect.set(searchTypeForHTTP, "slogintime", searchStr[0]);
              Reflect.set(searchTypeForHTTP, "elogintime", searchStr[1]);
            }
            break;
        }
      } else {
        if (
          searchType.value != undefined &&
          searchType.value != "" &&
          (searchStr as string).trim().length != 0
        ) {
          switch (searchType.value) {
            case "searchByid":
              Reflect.set(
                searchTypeForHTTP,
                "userid",
                parseInt(searchStr as string)
              );
              break;
            case "searchByPhone":
              Reflect.set(searchTypeForHTTP, "phone", searchStr as string);
              break;
          }
        }
      }

      searchTypeForHTTP = { ...searchTypeForHTTP, ...mangSelectobj };
      getUserListByHTTP(
        QS.stringify({ page: userListObj.page, rows: userListObj.rows }),
        searchTypeForHTTP
      );
    };
    const handleFrozen = (strStatus:string,strId:any)=>{
      let status = Number(strStatus)==0?1:0;
      let id = Number(strId)
      http_frozen({status,id}).then(res=>{
        console.log(res)
      })
    }
    const handleCloseDrawer = (): void => {
      //关闭抽屉
      visible.value = false;
      clickDrawerCheck.value =''
    };
    const handleDateSelect = (value: any[], value2: string[]): void => {
      //选择时间
      timeArr.value = [];
      timeArr.value = value2;
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
      clickDrawerCheck,
      pagination,
      loading,
      visible,
      drawerTitle,
      searchType,
      handleDateSelect,
      locals,
      timeArr,
      handleFrozen,
      drawerWidth,
      renderUserList,
      ...toRefs(drawerSelectState),
      ...toRefs(locals),
      ...toRefs(renderUserMsg),
      ...toRefs(customerstate),
    };
  },
});
</script>

<style lang="less" scoped>
// &:deep(.ant-input) {
//   padding: 5px 11px;
// }
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
</style>


