// 接口响应通用格式
export interface HttpResponse {
  status: number
  statusText: string
  data: {
    code: number
    msg: string
    [key: string]: any
  }
}
