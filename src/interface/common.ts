// 接口响应通用格式
export interface HttpResponse {
  status: number
  statusText: string
  [key: string]: any
}
