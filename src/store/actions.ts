import { Commit } from "vuex";
import { SAVE_TOKEN, SET_COLLAPSED } from "./actionTypes";
import { Istate } from "./storeTyping";
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
    }
}