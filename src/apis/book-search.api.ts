import request from '@/utils/request'
import { HttpResponse } from '@/interface/common'
import { IBookSearch } from '@/interface/book-search'

/*
 * 书籍搜集相关接口
 */
export class bookSearchService {
  searchBookList(params: IBookSearch): Promise<HttpResponse> {
    return request({
      method: 'get',
      params
    })
  }
}
