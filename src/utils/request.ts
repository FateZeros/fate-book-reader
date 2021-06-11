import Axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'
import { baseUrlAddr } from '@/self-config/index'

/**
 * get status code
 * @param {AxiosResponse} response Axios  response object
 */
const getErrorCode2Msg = (response: AxiosResponse): string => {
  /** http status code */
  const code = response.status
  /** error msg */
  let message = '请求错误'
  switch (code) {
    case 400:
      message = '请求错误'
      break
    case 401:
      message = '未授权'
      break
    case 403:
      message = '拒绝访问'
      break
    case 404:
      message = '访问资源不存在'
      break
    case 408:
      message = '请求超时'
      break
    case 500:
      message = '位置错误'
      break
    case 501:
      message = '承载服务未实现'
      break
    case 502:
      message = '网关错误'
      break
    case 503:
      message = '服务暂不可用'
      break
    case 504:
      message = '网关超时'
      break
    case 505:
      message = '暂不支持的 HTTP 版本'
      break
    default:
      message = '网络错误'
  }
  return message
}

/**
 * @returns  {AxiosResponse} result
 * @tutorial see more:https://github.com/onlyling/some-demo/tree/master/typescript-width-axios
 * @example
 * service.get<{data: string; code: number}>('/test').then(({data}) => { console.log(data.code) })
 */
const baseURL = process.env.NODE_ENV === 'development' ? '/CORS' : baseUrlAddr

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
      const errMsg = getErrorCode2Msg(response)
      return Promise.reject(new Error(errMsg))
    }
  },
  /** 请求无响应 */
  (error: AxiosError) => {
    const errorMsg: string = error.message || ''
    return Promise.reject(new Error(errorMsg))
  }
)

export default service
