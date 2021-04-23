import {get,post} from './http';
import {
   
    Icumstomer,
    IloginParams, IuserList
} from './typing'

export const httplogin = (parmas:IloginParams)=>post<IloginParams>('/admin/adminlogin',parmas); 
export const httpuserlist = (url:string ,parmas:IuserList)=>post<IuserList>(`/admin/userlist?${url}`,parmas); 
export const httpcustomer = (parmas:Icumstomer)=>get<Icumstomer>('/admin/servicelist',parmas); 