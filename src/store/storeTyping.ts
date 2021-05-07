

export interface Iownmsg{
    avatarimg: string
    birthday:string
    id: number
    level: number
    nickname: string
    sex: number
    status: number
    usertype: number
}

export interface IclickMsg{
    allPayNum: string
    appleLogin: string
    availableMoney: string
    availableNum: number
    customer: string
    id: string
    key: string
    keyid: string
    lastLoginTime: string
    setInTime: string
    sex: string
    status: string
    tel: string
    vipLevel: string
    wechatLogin:string
}
export interface Istate{
    collapsed:boolean
    token:string
    id:string
    ownmsg:Iownmsg
    clickMsg:IclickMsg
    userLists:any
}

export interface Iproperty{
    type:string,
    val:any
}

