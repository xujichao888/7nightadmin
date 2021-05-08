<template>
  <a-form ref="formRef" :model="formState" :rules="rules">
    <a-form-item label="客服ID" style="margin-left: 14px">
      接口暂无
    </a-form-item>
    <a-form-item label="客服昵称" name="nickname">
      <a-input allowClear v-model:value="formState.nickname" />
    </a-form-item>
    <a-form-item label="客服头像" required>
      <a-upload
        list-type="picture-card"
        action="/api/admin/uploadimage"
        :headers="uploadheaders"
        v-model:file-list="formState.fileList"
      >
        <div v-if="formState.fileList.length < 1">
          <plus-outlined />
          <div class="ant-upload-text">上传客服头像</div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item label="聊天背景" style="margin-left: 14px">
      <a-upload
        list-type="picture-card"
        action="/api/admin/uploadimage"
        :headers="uploadheaders"
        v-model:file-list="formState.talkFile"
        @preview="handlePreview"
      >
        <div v-if="formState.talkFile.length < 1">
          <plus-outlined />
          <div class="ant-upload-text">上传聊天背景</div>
        </div>
      </a-upload>
    </a-form-item>
       <a-form-item label="客服组" name="servicegroup" >
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
      <a-form-item label="邀请码">
          <a-input   placeholder="邀请码" v-model:value="formState.invitationCode" />
      </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { Form, Input, Select, Upload } from "ant-design-vue";
import { handleStorage } from "@/hooks/handleStorage";
import { PlusOutlined } from "@ant-design/icons-vue";
import { http_getCustomerInfo } from "@/assets/request/api";
import { useStore,Store} from "vuex";
export default defineComponent({
  components: {
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Upload.name]: Upload,
    [Select.name]:Select,
    aSelectOption:Select.Option,
    PlusOutlined,
  },
  setup() {
    interface Iresponse {
      code?: number;
      msg?: string;
      data: string[];
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
    interface IformState {
      id: String;
      nickname: string;
      fileList: IfileList[];
      talkFile: IfileList[];
      servicegroupBinding:string[];
      servicegroup:string[];
      invitationCode:string;
    }
    const formRef = ref<any>();
    let formState = reactive<IformState>({
      id: "",
      nickname: "冯先生",
      fileList: [],
      talkFile: [],
      servicegroupBinding:[],
      servicegroup:[],
      invitationCode:''
    });
    let rules = {
      nickname: { required: true, message: "昵称不能为空", trigger: "blur" },
    };
    let { getStorage } = handleStorage();
    const {
      token: { token },
    }: any = getStorage("token");
    const uploadheaders = {
      token,
    };
    const store:Store<any> = useStore()
    let ownmsg = computed(()=>store.state.ownmsg)
     http_getCustomerInfo({userid:ownmsg.value.id}).then((res: any) => {
          let { data } = res;
          console.log(data)
          formState.servicegroupBinding = data;
          let arr:string[] = []
         
          data.forEach((item:any) => {
              if(item.isexist){
                 formState.servicegroup.push(item.id+'')
              }
          });
    });
    const handlePreview = (e:any):void=>{
        console.log(e)
    }
    return {
      formRef,
      formState,
      rules,
      uploadheaders,
      handlePreview,
    };
  },
});
</script>

