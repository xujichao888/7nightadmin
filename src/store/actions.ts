import { Commit } from "vuex";
import { SAVE_RTMTOKEN, SAVE_TOKEN, SAVE_USERLIST, SETCLICK_ID, SET_CLICKMSG, SET_COLLAPSED, SET_LISTPROPERTY, SET_OWNMSG } from "./actionTypes";
import { IclickMsg, Iownmsg, Iproperty, Istate } from "./storeTyping";
interface Icommit{
    commit:Commit,
    state:Istate
}

export default{
    [SET_COLLAPSED]({commit}:Icommit,bool:boolean){
        commit(SET_COLLAPSED,bool)
    },
    [SAVE_TOKEN]({commit}:Icommit,token:string){
        commit(SAVE_TOKEN,token)
    },
    [SETCLICK_ID]({commit}:Icommit,id:string){
        commit(SETCLICK_ID,id)
    },
    [SET_OWNMSG]({commit}:Icommit,msg:Iownmsg){
        commit(SET_OWNMSG,msg)
    },
    [SET_CLICKMSG]({commit}:Icommit,msg:IclickMsg){
        commit(SET_CLICKMSG,msg)
    },
    [SAVE_USERLIST]({commit}:Icommit,list:IclickMsg[]){
        commit(SAVE_USERLIST,list)
    },
    [SET_LISTPROPERTY]({commit}:Icommit,obj:Iproperty){
        commit(SET_LISTPROPERTY,obj)
    },
    [SAVE_RTMTOKEN]({commit}:Icommit,client:any){
        commit(SAVE_RTMTOKEN,client)
    },
}