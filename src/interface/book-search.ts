export interface IBookSearchRequest {
  name: string
  page: number
}

export interface IBookChapterRequest {
  novelHref: string
}

export interface IBookSearchResponse {
  code: number
  msg: string
  data: IBookNameList[]
}

export interface IBookChapterResponse {
  code: number
  msg: string
  data: IBookChapterList[]
}

export interface IBookNameList {
  id: number
  novelAuthor: string
  novelDesc: string
  novelHref: string
  novelImg: string
  novelName: string
}

export interface IBookChapterList {
  id: number
  novelChapterHref: string
  novelChapterName: string
}

export interface IBookContentRequest {
  novelChapterHref: string
}

export interface IBookContentResponse {
  code: number
  msg: string
  data: string
}
