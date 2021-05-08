import axios from 'axios'
import { Iresult} from './typing'
import {handleStorage} from '@/hooks/handleStorage'
import router from '@/router'
import {  message } from "ant-design-vue";


// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = ''
}
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断4

    let {getStorage}=handleStorage();
    let storage = getStorage('token')
    if(storage==null){
      return config
    }
    const {token:{token}}:any = storage;
    if(token!=null){
      config.headers.token = `${token}`;
      config.headers['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }
    if(config.url=="/api/admin/uploadimage"){
      config.headers['content-type']='multipart/form-data'
    }
    return config
  },
  error => {
    
  })
// 重试队列，每一项将是一个待执行的函数形式
let requests: ((token: any) => void)[] = []
// 从localStorage中获取token
function getLocalToken () {
  const {token:{refresh_token}} = JSON.parse(window.localStorage.getItem('token') as string) 
  return refresh_token
}
// 创建一个axios实例

function refreshToken () {
  let refreshToken = getLocalToken()
  return axios.get(`/api/admin/refreshtoken?refreshToken=${refreshToken}`).then((res:any)=>res.data)
}


// 响应拦截器
let isRefresh:boolean = false; //是否正在刷新token
axios.interceptors.response.use(
   response => {
    const config = response.config;
    if (response.data.code === 0) {
      return Promise.resolve(response)
    } 
    if(response.data.code === 1000002){ //开始刷新token
      if(!isRefresh){
        isRefresh = true;
          return refreshToken().then((res:any)=>{
            console.log(res)
            let {setStorage}=handleStorage();
            setStorage('token',res.data)
            requests.forEach((item:any) => item())
            requests=[]
            return axios(config)
          })
     }else{
        return new Promise((resolve) => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requests.push(() => {
            resolve(axios(config))
          })
          
        })
      }
    }
    if(response.data.code == 1000005){
      message.error('token已过期,请重新登录')
      router.replace({path:'/'})
      return Promise.resolve(response)
    }
    return Promise.resolve(response)
    
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get <T>(url:String, params:T):Promise<Iresult> {
  return new Promise((resolve, reject) => {
    axios.get(url as string, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post<P>(url:string, params:P):Promise<Iresult>{
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
export function put<P>(url:string, params:P):Promise<Iresult>{
  return new Promise((resolve, reject) => {
    axios.put(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}