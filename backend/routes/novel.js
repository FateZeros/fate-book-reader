const router = require('koa-router')()
const sp = require('superagent')
const cheerio = require('cheerio')

/**
 * https://www.biquge.com.cn/search.php?q=
 * 根据名称模糊查询小说名称列表
 */
router.get('/api/getNovelNameList', async ctx => {
  const query = Object.assign({}, ctx.request.query)
  const { name, page = 1 } = query

  const titleList = []
  const result = await httpRequest({
    url: `https://www.biquge.com.cn/search.php?q=${name}&p=${page}`
  })

  const htmlStr = result.text
  const $ = cheerio.load(htmlStr)

  $('.result-item').each((index, el) => {
    const novelName = $(el)
      .find('.result-item-title span')
      .text()
    const novelHref = $(el)
      .find('.result-game-item-pic a')
      .attr('href')
    const novelImg = $(el)
      .find('.result-game-item-pic img')
      .attr('src')
    const novelDesc = $(el)
      .find('.result-game-item-desc')
      .text()
    const novelAuthor = $(el)
      .find('.result-game-item-info-tag')
      .eq(0)
      .children()
      .last()
      .text()
    titleList.push({
      id: index,
      novelHref,
      novelName,
      novelImg,
      novelDesc,
      novelAuthor
    })
  })
  ctx.body = {
    list: titleList
  }
})

/**
 * 获取小说全部章节
 * https://www.biquge.com.cn/book/58862/
 */
router.get('/api/getNovelChapterList', async ctx => {
  const query = Object.assign({}, ctx.request.query)
  const { novelHref } = query

  const novelChapterList = []
  const result = await httpRequest({
    url: `https://www.biquge.com.cn${novelHref}`
  })

  const htmlStr = result.text
  const $ = cheerio.load(htmlStr)
  $('#list')
    .find('dd')
    .each((index, el) => {
      const novelChapterName = $(el)
        .find('a')
        .text()
      const novelChapterHref = $(el)
        .find('a')
        .attr('href')
      novelChapterList.push({
        id: index,
        novelChapterName,
        novelChapterHref
      })
    })
  ctx.body = {
    list: novelChapterList
  }
})

/**
 * 根据小说章节获取章节内容
 * https://www.biquge.com.cn/book/58862/214380.html
 */
router.get('/api/getNovelContent', async ctx => {
  const query = Object.assign({}, ctx.request.query)
  const { novelChapterHref } = query
  const result = await httpRequest({
    url: `https://www.biquge.com.cn${novelChapterHref}`
  })

  const htmlStr = result.text
  const $ = cheerio.load(htmlStr)
  const novelContent = $('#content').html()

  ctx.body = {
    novelContent
  }
})

function httpRequest({ url, method = 'get', params = {} }) {
  return new Promise((resolve, reject) => {
    sp[method](url).end((req, res) => {
      resolve(res)
    })
  }).catch(err => {
    console(err)
  })
}

module.exports = router
