export interface IBookSearchRequest {
  name: string
  page: number
}

export interface IBookSearchResponse {
  code: number
  msg: string
  data: bookNameList[]
}

export interface bookNameList {
  id: number
  novelAuthor: string
  novelDesc: string
  novelHref: string
  novelImg: string
  novelName: string
}
