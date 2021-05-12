import { SAVE_RTMTOKEN, SAVE_USERLIST, SETCLICK_ID, SET_CLICKMSG, SET_COLLAPSED, SET_LISTPROPERTY, SET_OWNMSG } from "@/store/actionTypes";
import { IclickMsg, Iownmsg } from "@/store/storeTyping";
import { Store, useStore } from "vuex";

export interface IhandleStore {
    setCollapsed:(bool:boolean)=>void;
    setOwnMsg:(msg:Iownmsg)=>void;
    setClickMsg:(msg:IclickMsg)=>void;
    saveUserList:(list:IclickMsg[])=>void;
    setUserListPropertyByType:(type:string,val:any)=>void;
    saveRTMclient:(client:any)=>void
}

export function handleStores():IhandleStore{
    let store:Store<any> = useStore();

    function setCollapsed(bool:boolean):void{ //控制导航是否压缩
        store.dispatch(SET_COLLAPSED,bool)
    }
    function setOwnMsg(msg:Iownmsg):void{ //保存自己的信息
        store.dispatch(SET_OWNMSG,msg)
    }
    function setClickMsg(msg:IclickMsg):void{ //点击某一个用户的信息
        store.dispatch(SET_CLICKMSG,msg)
    }
    function saveUserList(list:IclickMsg[]):void{ //保存会员的数组
        store.dispatch(SAVE_USERLIST,list)
    }
    function setUserListPropertyByType(type:string,val:any):void{ //设置渲染数组中的某个属性
        store.dispatch(SET_LISTPROPERTY,{type,val})
    }
    function saveRTMclient(client:any):void{ //保存client
        store.dispatch(SAVE_RTMTOKEN,client)
    }
    return {
        setCollapsed,
        setOwnMsg,
        setClickMsg,
        saveUserList,
        setUserListPropertyByType,
        saveRTMclient
    }
}
