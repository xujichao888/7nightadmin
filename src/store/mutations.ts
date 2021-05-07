import { SAVE_TOKEN, SAVE_USERLIST, SETCLICK_ID, SET_CLICKMSG, SET_COLLAPSED, SET_LISTPROPERTY, SET_OWNMSG } from "./actionTypes";
import { IclickMsg, Iownmsg, Iproperty, Istate } from "./storeTyping";

export default{
    [SET_COLLAPSED](state:Istate,bool:boolean){ //设置导航压缩的状态
        state.collapsed = bool;
        console.log(state)
    },
    [SAVE_TOKEN](state:Istate,token:string){ //设置token
        state.token = token;
        console.log(state)
    },
    [SETCLICK_ID](state:Istate,id:string){ //设置点击的id
        state.id = id;
        console.log(state)
    },
    [SET_OWNMSG](state:Istate,msg:Iownmsg){ //设置点击的id
        state.ownmsg = msg;
        console.log(state)
    },
    [SET_CLICKMSG](state:Istate,msg:IclickMsg){ //设置点击的id
        state.clickMsg = msg;
        console.log(state)
    },
    [SAVE_USERLIST](state:Istate,list:IclickMsg[]){ //保存用户渲染数组
        state.userLists = list;
        console.log(state)
    },
    [SET_LISTPROPERTY](state:Istate,obj:Iproperty){
        let {type,val}=obj
        state.userLists.forEach((el:any) => {
          if(el.id == state.clickMsg.id){
              el[type] = val;
          }
        });
    }
}