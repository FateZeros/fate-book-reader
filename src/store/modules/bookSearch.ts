import BookSearchService from '@/apis/book-search'
import {
  IBookSearchRequest,
  IBookSearchResponse,
  bookNameList
} from '@/interface/book-search'
import { Commit } from 'vuex'

// initial state
const state = {
  // 检索的书籍列表
  bookNameList: []
}

// getters
const getters = {}

// actions
const actions = {
  async searchBookList(
    { commit }: { commit: Commit },
    params: IBookSearchRequest
  ) {
    return BookSearchService.searchBookList(params).then(res => {
      const bookSearchRes: IBookSearchResponse = res.data
      if (bookSearchRes.code === 200) {
        commit('SET_BOOK_NAME_LIST', bookSearchRes.data)
      }
    })
  }
}

// mutations
const mutations = {
  SET_BOOK_NAME_LIST: (state: any, data: bookNameList) => {
    state.bookNameList = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
