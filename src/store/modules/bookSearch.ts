import BookSearchService from '@/apis/book-search'
import {
  IBookSearchRequest,
  IBookSearchResponse,
  IBookNameList,
  IBookChapterRequest,
  IBookChapterResponse,
  IBookChapterList,
  IBookContentRequest,
  IBookContentResponse
} from '@/interface/book-search'
import { Commit } from 'vuex'

// initial state
const state = {
  // 检索的书籍列表
  bookNameList: [],
  // 书籍目录列表
  bookChapterList: [],
  // 章节内容
  bookChapterContent: ''
}

// getters
const getters = {}

// actions
const actions = {
  async searchBookList(
    { commit }: { commit: Commit },
    params: IBookSearchRequest
  ) {
    return BookSearchService.searchBookList(params)
      .then(res => {
        const bookSearchRes: IBookSearchResponse = res.data
        if (bookSearchRes.code === 200) {
          commit('SET_BOOK_NAME_LIST', bookSearchRes.data)
        }
      })
      .catch(() => {})
      .finally(() => {})
  },

  async searchBookChapterList(
    { commit }: { commit: Commit },
    params: IBookChapterRequest
  ) {
    return BookSearchService.searchBookChapterList(params)
      .then(res => {
        const bookChapterRes: IBookChapterResponse = res.data
        if (bookChapterRes.code === 200) {
          commit('SET_BOOK_CHAPTER_LIST', bookChapterRes.data)
        }
      })
      .catch(() => {
        throw new Error('网络错误')
      })
      .finally(() => {})
  },

  async searchBookContent(
    { commit }: { commit: Commit },
    params: IBookContentRequest
  ) {
    return BookSearchService.searchBookContent(params)
      .then(res => {
        const chapterContentRes: IBookContentResponse = res.data
        if (chapterContentRes.code === 200) {
          commit('SET_BOOK_CHAPTER_CONTENT', chapterContentRes.data)
        }
      })
      .catch(() => {})
      .finally(() => {})
  },

  async setBookContentEmpty({ commit }: { commit: Commit }) {
    commit('SET_BOOK_CHAPTER_CONTENT_EMPTY')
  }
}

// mutations
const mutations = {
  SET_BOOK_NAME_LIST: (state: any, data: IBookNameList) => {
    // 暂时不做翻页
    // state.bookNameList = state.bookNameList.concat(data)
    state.bookNameList = data
  },

  SET_BOOK_CHAPTER_LIST: (state: any, data: IBookChapterList) => {
    state.bookChapterList = data
  },

  SET_BOOK_CHAPTER_CONTENT: (state: any, data: string) => {
    state.bookChapterContent = data
  },

  SET_BOOK_CHAPTER_CONTENT_EMPTY: (state: any) => {
    state.bookChapterContent = ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
