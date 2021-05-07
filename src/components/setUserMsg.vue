<template>
  <div class="set-user">
    <a-form ref="formRef" :rules="rules" :model="formState">
      <a-form-item name="avatarimg" label="用户头像">
        <div class="avatar-boxs">
          <a-avatar :src="formState.avatarimg" :size="40" />
          <a-button class="changeAvtarBotton" @click="openDrawers('avatar')"
            >修改头像</a-button
          >
        </div>
        <a-input v-model:value="formState.avatarimg" style="display: none" />
      </a-form-item>
      <a-form-item label="昵称" name="nickname">
        <a-input
          v-model:value="formState.nickname"
          :defaultValue="formState.nickname"
        />
      </a-form-item>
      <a-form-item label="出生日期" name="birthday">
        <a-date-picker
          v-model:value="formState.birthday"
          required
          :format="birthdayFormat"
        />
      </a-form-item>
      <a-form-item label="身高(cm)" name="height">
        <a-input v-model:value="formState.height" />
      </a-form-item>
      <a-form-item label="体重(cm)" name="weight">
        <a-input v-model:value="formState.weight" />
      </a-form-item>
      <a-form-item label="常驻城市" name="city" class="citys">
        <a-cascader
          v-model:value="formState.city"
          :options="cityOptions"
          placeholder="请选择城市"
        />
      </a-form-item>
      <a-form-item
        label="罩杯"
        name="cup"
        class="citys"
        v-if="formState.sex == 0"
      >
        <a-select
          v-model:value="formState.cup"
          placeholder="please select your zone"
        >
          <a-select-option value="">保密</a-select-option>
          <a-select-option value="A">A</a-select-option>
          <a-select-option value="B">B</a-select-option>
          <a-select-option value="C">C</a-select-option>
          <a-select-option value="D">D</a-select-option>
          <a-select-option value="E">E</a-select-option>
          <a-select-option value="F">F</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="会员等级" name="level" v-if="formState.sex == 1">
        <a-select
          v-model:value="formState.level"
          placeholder="please select your zone"
        >
          <a-select-option value="0"> 非会员 </a-select-option>
          <a-select-option value="1"> 金牌 </a-select-option>
          <a-select-option value="2" v-if="formState.sex == 1"
            >钻石</a-select-option
          >
          <a-select-option value="3" v-if="formState.sex == 1"
            >vip本地</a-select-option
          >
          <a-select-option value="4" v-if="formState.sex == 1"
            >VIP全球</a-select-option
          >
          <a-select-option value="5" v-if="formState.sex == 1"
            >直通车</a-select-option
          >
          <a-select-option value="6" v-if="formState.sex == 1"
            >私人定制</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="是否认证" name="status" v-if="formState.sex == 0">
        <a-select v-model:value="formState.status">
          <a-select-option value="0"> 非认证 </a-select-option>
          <a-select-option value="1"> 认证 </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="指定客服" name="serviceid">
        <a-select
         
          v-model:value="formState.serviceid"
          placeholder="指定客服"
          @focus="handleGetServiceid"
        >
          <a-select-option
            :value="item.id"
            v-for="(item, index) in customerList"
            :key="index"
          >
            {{ item.id }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="客服权限" name="type">
        <a-switch v-model:checked="formState.type" />
      </a-form-item>
      <a-form-item label="客服组" name="servicegroup" v-if="formState.type">
        <a-select

          mode="multiple"
          v-model:value="formState.servicegroup"
          :token-separators="[',']"
         style="width:300px"
          placeholder="选择客服组"
        >
          <a-select-option v-for="(item) in formState.servicegroupBinding" :key="item.id+''">
            {{item.name}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="情感情况" name="emotion">
        <a-select v-model:value="formState.emotion" placeholder="选择情感情况">
          <a-select-option value="">保密</a-select-option>
          <a-select-option value="2">未婚</a-select-option>
          <a-select-option value="3">离异</a-select-option>
          <a-select-option value="4">已婚</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否字母圈" name="sadomasochism">
        <a-select
          v-model:value="formState.sadomasochism"
          placeholder="please select your zone"
        >
          <a-select-option value="0">是</a-select-option>
          <a-select-option value="1">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="微信二维码" name="wechatcode">
        <a-upload
          list-type="picture-card"
          action="/api/admin/uploadimage"
          :headers="uploadheaders"
          v-model:file-list="formState.fileList"
        >
          <div v-if="formState.fileList.length < 1">
            <plus-outlined />
            <div class="ant-upload-text">上传二维码</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="职业" name="vocation">
        <a-input
          v-model:value="formState.vocation"
          :defaultValue="formState.vocation"
          placeholder="输入职业"
        />
      </a-form-item>
      <a-form-item label="车型" name="vehicle" v-if="formState.sex == 1">
        <a-input
          v-model:value="formState.vehicle"
          :defaultValue="formState.vehicle"
          placeholder="输入车型"
        />
      </a-form-item>
      <a-form-item v-for="item in userInfoTage" :key="item.id">
        <usertag :renderArr="item" @changeState="handleTagSelects" />
      </a-form-item>

      <div style="width: 200px" class="photoWall citys">照片墙</div>
      <a-upload
        list-type="picture-card"
        action="/api/admin/uploadimage"
        :headers="uploadheaders"
        v-model:file-list="formState.imagesFile"
      >
        <div v-if="formState.imagesFile.length < 9">
          <plus-outlined />
          <div class="ant-upload-text">上传图片</div>
        </div>
      </a-upload>
    </a-form>
  </div>
  <subBar @closeDrawer="handleCloseDrawer" @submit="onSubmit" />
  <a-drawer
    :title="twosTitle"
    :width="400"
    placement="right"
    :closable="true"
    :visible="avatarSelectVisible"
    @close="handleAvatarVisibleClose"
  >
    <avatarSelect
      :allavatar="allavatar"
      @changeSelectActive="changeSelectActive"
    />
    <subBar @closeDrawer="handleAvatarVisibleClose" @submit="handleTwiceSub" />
  </a-drawer>
</template>

<script lang="ts">
import {
  http_getAvatar,
  http_getuserinfo,
  http_getuserinfotag,
  httpcustomer,
  http_getCustomerInfo,
  http_updateuserexpand,
} from "@/assets/request/api";
import { computed, defineComponent, reactive, toRefs, watchEffect } from "vue";
import {
  Button,
  Form,
  Input,
  Avatar,
  Drawer,
  DatePicker,
  Cascader,
  Select,
  Upload,
  Switch,
  message,
} from "ant-design-vue";
import { ref } from "vue";
import { useStore } from "vuex";
import subBar from "./subBar.vue";
import avatarSelect from "./avatarSelect.vue";
import usertag from "./usetTag.vue";
import moment, { Moment } from "moment";
import { exchangeTime } from "@/hooks/pubFun";
import { RuleObject } from "node_modules/ant-design-vue/lib/form/interface";
import { provinceDatas } from "@/utils/provinceData";
import { handleStorage } from "@/hooks/handleStorage";
import { PlusOutlined } from "@ant-design/icons-vue";
import nanoid from 'nanoid'
import { Iupdateuser } from "@/assets/request/typing";
export default defineComponent({
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Avatar.name]: Avatar,
    [Drawer.name]: Drawer,
    [DatePicker.name]: DatePicker,
    [Cascader.name]: Cascader,
    [Select.name]: Select,
    aSelectOption: Select.Option,
    [Upload.name]: Upload,
    [Switch.name]: Switch,
    usertag,
    subBar,
    avatarSelect,
    PlusOutlined,
  },
  emits: ["closeDrawer"],
  setup(props, ctx) {
    interface Iresponse{
      code?:number;
      msg?:string;
      data:string[];
    }
    interface IfileList {
      uid: string;
      name?: string;
      status?: string;
      response?: Iresponse;
      percent?: number;
      url?: string;
      preview?: string;
      originFileObj?: any;
    }
    interface Iimages {
      fuzzy?: string;
      id?: number;
      image?: string;
      order?: number;
      userid?: number;
    }
    interface IformState {
      avatarimg: string;
      nickname: string;
      birthday: Moment;
      height: string;
      weight: string;
      city: string[];
      cup: string;
      sex: number;
      emotion: string;
      sadomasochism: string;
      level: string;
      fileList: IfileList[];
      vocation: string;
      vehicle: string;
      serviceid: string;
      type: boolean;
      images: Iimages[];
      imagesFile: IfileList[];
      status: string;
      servicegroup: string[];
      servicegroupBinding:string[];
    }
    interface Iavatar {
      select: boolean;
      img: string;
    }
    interface Iallavatar {
      allavatar: Iavatar[];
    }
    interface IselectTag {
      freetime: string[];
      mode: string[];
      hobbystr: string[];
      motion: string[];
      food: string[];
      travellocation: string[];
      ment: string[];
      userdescribe: string[];
    }
    interface ItagMsg {
      userInfo?: any;
      userInfoTage?: any;
      selectTag: IselectTag;
    }
    interface IcustomerItem {
      id: number;
      name: string;
      isexist: boolean;
    }
    interface Icustomer {
      customerArr: IcustomerItem[];
    }
    let customerstate = reactive({
      //客服列表
      customerList: [],
    });
    let { emit } = ctx;
    let store = useStore();
    let { getStorage } = handleStorage();
    const {
      token: { token },
    }: any = getStorage("token");
    const uploadheaders = {
      token,
    };
    const birthdayFormat = "YYYY/MM/DD";
    const now = new Date();
    let formRef = ref<any>(null);
    let avatarSelectVisible = ref<boolean>(false);
    let twosTitle = ref<string>("");
    let cityOptions = provinceDatas();
    let allAvatar = reactive<Iallavatar>({
      allavatar: [],
    });
    let customerGroup = reactive<Icustomer>({
      customerArr: [],
    });
    const initState = reactive<ItagMsg>({
      userInfo: {
        sex: -1,
        avatarimg: "",
        birthday: "2020-01-01",
      },
      userInfoTage: [],
      selectTag: {
        freetime: [],
        mode: [],
        hobbystr: [],
        motion: [],
        food: [],
        travellocation: [],
        ment: [],
        userdescribe: [],
      },
    });

    const checkIsNum = (str: string) => {
      return (rule: RuleObject, value: string) => {
        if (isNaN(Number(value))) {
          return Promise.reject(`${str}只能填写数字`);
        } else {
          return Promise.resolve();
        }
      };
    };
    const rules = {
      avatarimg: [{ required: true, message: "头像不能为空" }],
      nickname: [{ required: true, message: "昵称不能为空!", trigger: "blur" }],
      birthday: [
        { required: true, message: "出生日期不能为空!", type: "object" },
      ],
      height: [
        { required: true, message: "身高不能为空!" },
        { validator: checkIsNum("身高"), trigger: "blur", type: "object" },
      ],
      weight: [
        { required: true, message: "身高不能为空!" },
        { validator: checkIsNum("体重"), trigger: "blur" },
      ],
      city: [
        {
          require: true,
          message: "常驻城市不能为空",
          type: "array",
          min: 1,
          trigger: "change",
        },
      ],
    };

    let formState = reactive<IformState>({
      avatarimg: "",
      nickname: "",
      birthday: moment(initState.userInfo.birthday, birthdayFormat),
      height: "0",
      weight: "0",
      city: [],
      cup: "",
      sex: 1,
      emotion: "1",
      sadomasochism: "0",
      level: "0",
      fileList: [],
      vocation: "",
      vehicle: "",
      serviceid: "",
      type: false,
      images: [],
      imagesFile: [],
      status: "0",
      servicegroup: [],
      servicegroupBinding:[]
    });

    let { value: { id } } = computed(() => store.state.clickMsg);
    const getUserInfoByHTTP = async (): Promise<void> => {
      let { data } = await http_getuserinfo({ userid: id });
      console.log(data);
      initState.userInfo = data;
      let {
        avatarimg,
        nickname,
        height,
        weight,
        city1,
        cup,
        sex,
        emotion,
        sadomasochism,
        level,
        wechatcode,
        serviceid,
        type,
        freetime,
        mode,
        hobbystr,
        motion,
        food,
        travellocation,
        ment,
        userdescribe,
        images,
        status,
        vehicle,
        vocation,
      } = data;
      let arr = [];
      if (city1 == 0) {
        arr[0] = "-1";
      } else {
        arr[0] = (city1 + "").substr(0, 2);
        arr[1] = city1 + "";
      }
      formState.avatarimg = avatarimg;
      formState.nickname = nickname;
      formState.birthday = moment(initState.userInfo.birthday, birthdayFormat);
      formState.height = height + "";
      formState.weight = weight + "";
      formState.city = arr;
      formState.cup = cup;
      formState.sex = sex;
      formState.vehicle = vehicle;
      formState.vocation = vocation;
      formState.emotion = emotion;
      formState.sadomasochism = sadomasochism;
      formState.level = level + "";
      formState.fileList =
        wechatcode.trim().length > 0
          ? [{ uid: "-1", name: "image.png", status: "done", url: wechatcode }]
          : [];
      formState.serviceid = serviceid + "";
      formState.type = type > 0 ? true : false;
      formState.images = images;
      formState.status = status + "";
      images.forEach((element: any) => {
        formState.imagesFile.push({
          uid: element.order + 1 * -1 + "",
          name: "image.png",
          status: "done",
          url: element.image,
        });
      });
      initState.selectTag.freetime = checkTagchange(freetime);
      initState.selectTag.mode = checkTagchange(mode);
      initState.selectTag.hobbystr = checkTagchange(hobbystr);
      initState.selectTag.motion = checkTagchange(motion);
      initState.selectTag.food = checkTagchange(food);
      initState.selectTag.travellocation = checkTagchange(travellocation);
      initState.selectTag.ment = checkTagchange(ment);
      initState.selectTag.userdescribe = checkTagchange(userdescribe);
    };
    watchEffect(() => {
      if (
        JSON.stringify(initState.selectTag) != "{}" &&
        initState.userInfoTage.length > 0
      ) {
        //设置默认tag数据
        for (let key in initState.selectTag) {
          if (initState.selectTag[key].length > 0) {
            initState.userInfoTage.forEach((item: any, index: number) => {
              if (item.tag == key) {
                initState.selectTag[key].forEach((element: any) => {
                  let idx = item.value.findIndex((item: any, fidx: number) => {
                    return item.val == element;
                  });
                  if (idx == -1) {
                    item.value.unshift({ select: true, val: element });
                  } else {
                    item.value[idx].select = true;
                  }
                });
              }
            });
          }
        }
      }
      if (formState.type) {
        //判断是否开启客服
        console.log("我草开了");
        http_getCustomerInfo({userid:initState.userInfo.id}).then((res: any) => {
          let { data } = res;
          customerGroup.customerArr = data;
          formState.servicegroupBinding = data;
          console.log(data)
          let arr:string[] = []
         
          data.forEach((item:any) => {
              if(item.isexist){
                 formState.servicegroup.push(item.id+'')
              }
          });
        });
      }else{
         formState.servicegroup=[];
      }
    });
    const checkTagchange = (str: string): string[] => {
      if (str.length > 0 && str.indexOf(",") == -1) {
        return [str];
      }
      if (str.length > 0 && str.indexOf(",") != -1) {
        return str.split(",");
      }
      return [];
    };
    const getUserInfoTagsByHTTP = async (): Promise<void> => {
      let { data } = await http_getuserinfotag({ userid: id });

      initState.userInfoTage = data.map((item: any) => {
        let arr = item.value.split(",");
        let sort = 0;
        switch (item.tag) {
          case "freetime":
            sort = 9;
            break;
          case "mode":
            sort = 8;
            break;
          case "hobbystr":
            sort = 7;
            break;
          case "motion":
            sort = 6;
            break;
          case "food":
            sort = 5;
            break;
          case "travellocation":
            sort = 4;
            break;
          case "ment":
            sort = 3;
            break;
          case "userdescribe":
            sort = 2;
            break;
        }
        arr = arr.map((item: any) => {
          return { select: false, val: item };
        });
        return { id: item.id, tag: item.tag, value: arr, sort };
      });
      initState.userInfoTage.sort((a: any, b: any) => b.sort - a.sort);
    };
    getUserInfoByHTTP();
    getUserInfoTagsByHTTP();

    const handleCloseDrawer = (): void => {
      //关闭抽屉
      emit("closeDrawer");
    };
    const handleGetServiceid = async (): Promise<void> => {
      if (customerstate.customerList.length > 0) return;
      let {
        data: { data },
      } = await httpcustomer({});

      customerstate.customerList = data;
    };
    const handleAvatarVisibleClose = (): void => {
      avatarSelectVisible.value = false;
    };
    const handleTwiceSub = (): void => {
      handleAvatarVisibleClose();
      for (let i = 0; i < allAvatar.allavatar.length; i++) {
        let item: Iavatar = allAvatar.allavatar[i];
        if (item.select) {
          formState.avatarimg = item.img;
          return;
        }
      }
    };
    const openDrawers = async (type: string): Promise<void> => {
      switch (type) {
        case "avatar":
          twosTitle.value = "头像选择";
          let { data } = await http_getAvatar({
            sex: initState.userInfo.sex,
            type: "1",
          });
          let str = formState.avatarimg.substr(
            0,
            formState.avatarimg.indexOf("?")
          );
          data = data.map((element: any) => {
            return { select: element == str && true, img: element };
          });
          allAvatar.allavatar = data;
          break;
      }
      avatarSelectVisible.value = true;
    };
    const changeSelectActive = (idx: number): void => {
      allAvatar.allavatar.forEach((item: any) => {
        item.select = false;
      });

      allAvatar.allavatar[idx].select = true;
    };
    const handleUploadwechat = (a:any,b:any,c:any)=>{
      console.log(a,b,c)

    }
    const handleTagSelects = (somes: any) => {
      let { type, idx } = somes;

      initState.userInfoTage.forEach((item: any) => {
        if (item.tag == type) {
          item.value[idx].select = !item.value[idx].select;
          let index = initState.selectTag[type].indexOf(item.value[idx].val);
          if (index != -1) {
            initState.selectTag[type].splice(index);
          } else {
            initState.selectTag[type].push(item.value[idx].val);
          }
        }
      });
    };
    const onSubmit = (): void => {
      formRef.value
        .validate()
        .then(() => {
          console.log(formState);
          let {
            avatarimg,
            birthday: beforBirthday,
            cup,
            emotion,
            height: beforHeight,
            level: beforeLevel,
            status: beforStatus,
            nickname,
            city: beforCity,
            sadomasochism: beforsadomasochism,
            servicegroup:beforservicegroup,
            serviceid:beforserviceid,
            imagesFile,
            type,
            vehicle,
            vocation,
            fileList,
            weight:beforeWeight,
          } = formState;
          let { bust, describe, hips,waist } = initState.userInfo;
          const birthday = beforBirthday.format().substr(0, 10);
          switch (emotion) {
            case "2":
              emotion = "未婚";
              break;
            case "3":
              emotion = "离异";
              break;
            case "4":
              emotion = "已婚";
              break;
          }
          console.log(initState.selectTag);
          const food = initState.selectTag["food"].join(",");
          const freetime = initState.selectTag["freetime"].join(",");
          const hobbystr = initState.selectTag["hobbystr"].join(",");
          const ment = initState.selectTag["ment"].join(",");
          const mode = initState.selectTag["mode"].join(",");
          const motion = initState.selectTag["motion"].join(",");
          const travellocation = initState.selectTag['travellocation'].join(",")
          const level = Number(beforeLevel);
          const height = Number(beforHeight);
          const status = Number(beforStatus);
          const sadomasochism = Number(beforsadomasochism);
          const serviceid =Number(beforserviceid)
          const weight = Number(beforeWeight)
          console.log(beforCity);
          console.log(cityOptions);
          let cityname = "";
          cityOptions.forEach((item: any) => {
            if (item.value == beforCity[0] && beforCity[0]!='-1') {
              item.children.forEach((element: any) => {
                if (element.value == beforCity[1]) {
                  cityname = element.label;
                }
              });
            }
          });
          const permanent_city = [{ cityname, city:  beforCity[1] }];
          const userid = Number(initState.userInfo.id)
          const userimg = imagesFile.length>0? imagesFile.map((item:any)=>{
            return item.url?item.url:item.response.data[0]
          }):[]
          let beforwechatcode = fileList.length>0? fileList.map((item:any)=>{
            return item.url?item.url:item.response.data[0]
          }):[]
           let wechatcode = beforwechatcode.join('')
          const usertype = type?1:0;
          console.log(beforservicegroup)
          const servicegroup = beforservicegroup.map((item:any)=>{
            return Number(item)
          })
          let reqBody:Iupdateuser = {
               avatarimg,
              birthday,
              bust,
              cup,
              describe,
              emotion,
              food,
              freetime,
              height,
              hips,
              hobbystr,
              level,
              ment,
              mode,
              motion,
              nickname,
              permanent_city,
              sadomasochism,
              servicegroup,
              serviceid,
              status,
              travellocation,
              userid,
              userimg,
              usertype,
              vehicle,
              vocation,
              waist,
              wechatcode,
              weight
          }
          const hide = message.loading("修改中...", 0); //message.destroy()
          http_updateuserexpand(reqBody).then(res=>{
            message.destroy();
            console.log(res)
            if(res.code == 0){
                message.success("修改成功....");
                handleCloseDrawer();
            }else{
              message.error(res.msg)
            }
          })

        })
        .catch((e: any) => {
          console.log("error",e);
        });
    };
    return {
      id,
      handleCloseDrawer,
      handleAvatarVisibleClose,
      openDrawers,
      formRef,
      rules,
      formState,
      onSubmit,
      twosTitle,
      birthdayFormat,
      handleTwiceSub,
      avatarSelectVisible,
      changeSelectActive,
      cityOptions,
      uploadheaders,
      handleGetServiceid,
      handleTagSelects,
      handleUploadwechat,
      ...toRefs(customerstate),
      ...toRefs(allAvatar),
      ...toRefs(initState),
    };
  },
});
</script>

<style lang="less" scoped>
// &:deep(.anticon-eye) {
//   display: none;
// }

.set-user {
  width: 100%;
  height: 100%;
  .citys::before {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 3;
    content: "*";
  }
}
.submit-box {
  background: #fff;
  display: flex;
  height: 60px;
  width: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  border-top: 1px solid #e9e9e9;
  align-items: center;
  justify-content: flex-end;
  padding-right: 30px;
}
.avatar-boxs {
  display: flex;
  align-items: center;
  .changeAvtarBotton {
    margin-left: 10px;
  }
}
</style>


