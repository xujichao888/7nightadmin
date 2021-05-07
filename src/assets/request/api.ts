import {get,post, put} from './http';
import {
   
    Icumstomer,
    Ifriendcount,
    IfriendLog,
    Ifrozen,
    Igetimg,
    IloginParams, Iupdateuser, IuserInfotage, IuserList
} from './typing'

export const httplogin = (parmas:IloginParams)=>post<IloginParams>('/api/admin/adminlogin',parmas);  //登录接口
export const httpuserlist = (url:string ,parmas:IuserList)=>post<IuserList>(`/api/admin/userlist?${url}`,parmas);  //获得用户列表
export const httpcustomer = (parmas:Icumstomer)=>get<Icumstomer>('/api/admin/servicelist',parmas); //获得客服的列表信息
export const http_getuserinfotag = (parmas:IuserInfotage)=>get<IuserInfotage>('/api/admin/getuserinfotag',parmas); //获得用户全部的tag
export const http_getuserinfo = (parmas:IuserInfotage)=>get<IuserInfotage>('/api/admin/userinfo',parmas); //根据ID获得信息
export const http_getAvatar = (parmas:Igetimg)=>get<Igetimg>('/api/user/getstaticimage',parmas) //请求头像图片
export const http_getCustomerInfo = (parmas:Icumstomer)=>get<Icumstomer>('/api/admin/getgroups',parmas) //请求客服组
export const http_updateuserexpand = (parmas:Iupdateuser)=>put<Iupdateuser>('/api/admin/updateuserexpand',parmas) //修改用户的数据
export const http_frozen = (parmas:Ifrozen)=>put<Ifrozen>('/api/admin/userenable',parmas) //冻结或者解冻
export const http_setfriendcount = (parmas:Ifriendcount)=>put<Ifriendcount>('/api/admin/setfriendcount',parmas) //修改加好友次数
export const http_friendlog = (parmas:IfriendLog)=>get<IfriendLog>('/api/admin/friendlog',parmas) //好友次数日志
export const http_propslogs = (parmas:Icumstomer)=>get<Icumstomer>('/api/admin/propslogs',parmas) //获得充值道具日志