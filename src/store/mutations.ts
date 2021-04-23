import { SAVE_TOKEN, SET_COLLAPSED } from "./actionTypes";
import { Istate } from "./storeTyping";

export default{
    [SET_COLLAPSED](state:Istate,bool:boolean){
        state.collapsed = bool;
        console.log(state)
    },
    [SAVE_TOKEN](state:Istate,token:string){
        state.token = token;
        console.log(state)
    },
}