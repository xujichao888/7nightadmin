import { SAVE_TOKEN } from "@/store/actionTypes"
import { computed } from "vue"
import { Store, useStore } from "vuex"

export interface IhandleToken {
    saveToken: (token: string) => void,
    getToken: () => any,

}

export function handleToken(): IhandleToken {
    let store: Store<any> = useStore()
    const saveToken = (token: string): void => {
        console.log(store)
        store.dispatch(SAVE_TOKEN, token)
    }
    const getToken = (): any => {
        return computed(() => store.state.token)
    }
    return {
        saveToken,
        getToken

    }
}