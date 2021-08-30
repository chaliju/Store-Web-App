import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    // 真实接口请联系coderwhy老师
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1 请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log('来到了request拦截failure中');
  })

  // 2.2 响应拦截
  instance.interceptors.response.use(res=> {
    return res.data
  }, err => {
    // console.log(err);
    return err
  })

  // 3.发送真正的网络请求
  // 返回值本身就是Promise
  return instance(config)
}


