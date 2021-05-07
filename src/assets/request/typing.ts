export interface IloginParams { //请求参数接口
    username: string; 
    password: string;
}
export interface Iresult {
    code:LOGINCODESTATE,
    msg:string
    data:any
}
export interface Ifriendcount {
    rightsval: number
    targetid: number
  
}
export interface IfriendLog{
  userid:number
  page:number
  rows:number
}
export interface IuserList{ //获得用户列表的接口
  url?:string,
  elogintime?: string,
  eregtime?: string,
  level?: number,
  phone?: string,
  serviceid?: number,
  sex?: number,
  slogintime?: string,
  source?: string,
  sregtime?: string,
  userid?: number
}
interface Icitysforupdate{
  city: string,
  cityname: string
}
export interface Iupdateuser{
    avatarimg: string,
    birthday: string,
    bust: number,
    cup: string,
    describe: string,
    emotion: string,
    food: string,
    freetime: string,
    height: number,
    hips: number,
    hobbystr: string,
    level: number,
    ment: string,
    mode: string,
    motion: string,
    nickname: string,
    permanent_city: Icitysforupdate[],
    sadomasochism: number,
    servicegroup: number[],
    serviceid: number,
    status: number,
    travellocation: string,
    userid: number,
    userimg: string[],
    usertype: number,
    vehicle: string,
    vocation: string,
    waist: number,
    wechatcode: string,
    weight: number
  
}
export interface Ifrozen{
  id:number;
  status:number;
}
export interface Icumstomer{
  userid?:string
}
export interface IuserInfotage{
  userid:string
}
export enum SEX{
  ALL=-1,
  WOMAN=0,
  MAN=1
}
export interface Igetimg{
  sex:SEX,
  type:'1'
}

export enum LOGINCODESTATE { //请求返回code枚举
  // RcOk 成功
  RcOk=0,
  // RcSysErr 系统错误
  RcSysErr=1000000,
  // RcTimeout 请求超时
  RcTimeout=1000001,
  // RcUnauthorized 未授权
  RcUnauthorized=1000002,
  // RcParmErr 参数错误
  RcParmErr=1000003,
  // RcServiceFail 业务操作失败
  RcServiceFail=1000004,
  // RefreshTokenFail 刷新token过期
  RefreshTokenFail=1000005,

  // RcImageAgainst 上传图片违规
  RcImageAgainst=2000001,
  // RcUserCaptchaErr 验证码错误
  RcUserCaptchaErr=2000002,
  // RcUserPwdErr 密码错误
  RcUserPwdErr=2000003,
  // RcLevelFail 当前等级无法操作
  RcLevelFail=2000004,
  // RcBadWordsFail 内容包含敏感词
  RcBadWordsFail=2000005,

  // RcUserLevelErr 您的套餐不支持查看私照
  RcUserLevelErr=3000001,
  // RcUserStatusErr 非认证用户不支持查看私照
  RcUserStatusErr=3000002,
  // RcExceedImageUser 超出每天可查看照片人数
  RcExceedImageUser=3000003,
  // RcExceedImageNum 超出每天可查看照片数
  RcExceedImageNum=3000004,
  // RcIsViewImage 已经看过该照片了
  RcIsViewImage=3000005,

  // RcIsApplyFriend 已经申请过好友了
  RcIsApplyFriend=3000006,
  // RcIsStatusFail 通过审核后才能加好友
  RcIsStatusFail=3000007,
  // RcNotFriendCount 没有足够的加好友次数
  RcNotFriendCount=3000008,
  // RcNotFriendCount 没有足够的钻石
  RcNotMoneyCount=3000009,
  success
}