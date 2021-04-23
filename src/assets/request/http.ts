import axios from 'axios'
import { Iresult} from './typing'
import {handleStorage} from '@/hooks/handleStorage'
import router from '@/router'
import {  message } from "ant-design-vue";
// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://10.40.1.67:9966/v1'
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
    let {getStorage}=handleStorage()
    const token = getStorage('token');
    if(token!=null){
      config.headers.AdminToken = `${token}`;
      config.headers['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }
    return config
  },
  error => {
    
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    //console.log(response)
    if (response.data.code === 0) {
      return Promise.resolve(response)
    } else {
      message.error('token已过期,请重新登录')
      router.replace({path:'/'})
      return Promise.resolve(response)
    }
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