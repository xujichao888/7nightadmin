


export function handleStorage() {

    const getStorage = (id: string): any => {
        let result: string | null = localStorage.getItem(id)
        return result == null ? null : JSON.parse(result as string)
    }
    const setStorage = (id: string, value: any): void => {
        localStorage.setItem(id, JSON.stringify(value))
    }
    const removeStoage = (id: string): void => {
        localStorage.removeItem(id)
    }
    const saveLoginTime = (time:number):void=>{
        console.log(time)
        localStorage.setItem('loginTime', time+'')
    }
    const getLoginTime = ():any=>{
        let result: string | null = localStorage.getItem('loginTime')
        return result == null ? null : JSON.parse(result as string)
    }
    return {
        getStorage,
        setStorage,
        removeStoage,
        saveLoginTime,
        getLoginTime,
    }
}
