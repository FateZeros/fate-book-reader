import request from '@/utils/request'
import { HttpResponse } from '@/interface/common'
import {
  IBookSearchRequest,
  IBookChapterRequest,
  IBookContentRequest
} from '@/interface/book-search'

export default class bookSearchService {
  /*
   * 书籍搜集相关接口
   */
  static searchBookList(params: IBookSearchRequest): Promise<HttpResponse> {
    return request({
      url: '/api/getNovelNameList',
      method: 'get',
      params
    })
  }

  /**
   * 获取书籍的全部章节
   */
  static searchBookChapterList(
    params: IBookChapterRequest
  ): Promise<HttpResponse> {
    return request({
      url: '/api/getNovelChapterList',
      method: 'get',
      params
    })
  }

  /**
   * 获取书籍的章节内容
   */
  static searchBookContent(params: IBookContentRequest): Promise<HttpResponse> {
    return request({
      url: '/api/getNovelContent',
      method: 'get',
      params
    })
  }
}
