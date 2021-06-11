import Axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'
import { baseUrlAddr } from '@/self-config/index'

/**
 * @returns  {AxiosResponse} result
 * @tutorial see more:https://github.com/onlyling/some-demo/tree/master/typescript-width-axios
 * @example
 * service.get<{data: string; code: number}>('/test').then(({data}) => { console.log(data.code) })
 */
const baseURL = process.env === 'develop' ? '/CORS' : baseUrlAddr

const service = Axios.create({
  baseURL,
  timeout: 10000
})

/**
 * @description 请求发起前的拦截器
 * @returns {AxiosRequestConfig} config
 */
service.interceptors.request.use(async (config: AxiosRequestConfig) => {
  return config
})

/**
 * @description 响应收到后的拦截器
 * @returns {}
 */
service.interceptors.response.use(
  /** 请求有响应 */
  async (response: AxiosResponse) => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error())
    }
  },
  /** 请求无响应 */
  (error: AxiosError) => {
    const errorMsg: string = error.message || ''
    return Promise.reject(new Error(errorMsg))
  }
)

export default service
