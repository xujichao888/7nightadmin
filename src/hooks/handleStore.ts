import { SET_COLLAPSED } from "@/store/actionTypes";
import { Store, useStore } from "vuex";

export interface IhandleStore {
    setCollapsed:(bool:boolean)=>void
}

export function handleStores():IhandleStore{
    let store:Store<any> = useStore();

    function setCollapsed(bool:boolean):void{ //控制导航是否压缩
        store.dispatch(SET_COLLAPSED,bool)
    }
    
    return {
        setCollapsed
    }
}
