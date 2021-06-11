import request from '@/utils/request'
import { HttpResponse } from '@/interface/common'
import { IBookSearchRequest } from '@/interface/book-search'

/*
 * 书籍搜集相关接口
 */
export default class bookSearchService {
  static searchBookList(params: IBookSearchRequest): Promise<HttpResponse> {
    return request({
      url: '/api/getNovelNameList',
      method: 'get',
      params
    })
  }
}
