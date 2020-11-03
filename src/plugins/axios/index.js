/**
 * Created by Breaker-93 on 2019/12/28.
 */
import axios from 'axios'
import Qs from 'qs'
import { Message, MessageBox } from 'element-ui'
import { Toast } from 'vant'
import store from '@/store'
import { getToken } from '@assets/js/auth'
// 创建axios实例
const xhr = axios.create({
  baseURL: process.env.VUE_APP_API, // api 的 base_url
  timeout: 30000, // 请求超时时间
  withCredentials: true,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
  transformRequest: [(data) => {
    // 在请求之前对data传参进行格式转换
    data = Qs.stringify(data, { arrayFormat: 'indices', allowDots: true })
    return data
  }]
})

// request拦截器
xhr.interceptors.request.use(
  config => {
    // 在请求发出前：
    //  1.添加显示loading
    //  2.请求头中添加公共的token(供服务端验证权限)
    //  3.对特殊请求的参数进行特殊处理
    let token = getToken()
    if (token) {
      config.headers['Authentication'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    // Do something with request error
    console.error(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
xhr.interceptors.response.use(
  res => {
    // 在响应返回后：
    //  1.移除loading
    //  2.统一取出res.data
    //  3.根据状态码对需要处理的业务状态进行处理
    if (res.data.code && res.data.code !== '200') {

      // 登录权限过期处理（溢出token,页面重定向）
      if (res.data.code === '402') {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
        // removeToken()
        // location.reload() // 为了重新实例化vue-router对象 避免bug, 路由导航时验证权限并重定向至登录页
      }
      // 其他异常，直接弹出提示
      else {
        // Message({
        //   message: res.data.data || res.data.msg,
        //   type: 'error',
        //   duration: 5 * 1000
        // })
        Toast({type: 'fail', message: res.data.data || res.data.msg, duration: 3000});
      }
      return Promise.reject(res.data)
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default xhr
