const router = require('koa-router')()
const sp = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const qs = require('qs')

/**
 * https://www.biquge.com.cn/search.php?q=
 * 根据名称模糊查询小说名称列表
 */
router.get('/api/getNovelNameList', async ctx => {
  const query = Object.assign({}, ctx.request.query)
  const { name, page = 1 } = query

  const titleList = []
  const result = await httpRequest({
    url: `https://www.biquge.com.cn/search.php?q=${encodeURIComponent(
      name
    )}&p=${page}`
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
    const novelUpdateTime = $(el)
      .find('.result-game-item-info-tag')
      .eq(2)
      .children()
      .last()
      .text()
    titleList.push({
      id: index,
      novelHref,
      novelName,
      novelImg,
      novelDesc,
      novelAuthor,
      novelUpdateTime
    })
  })
  // 总页数
  const totalPageStr = $('.search-result-page-main')
    .find('a')
    .last()
    .attr('href')
  const totalPageStrParams = totalPageStr.substr(totalPageStr.indexOf('?') + 1)
  const { p = 1 } = qs.parse(totalPageStrParams)

  ctx.body = {
    code: 200,
    msg: '获取成功',
    data: {
      currentPage: Number(page),
      totalPage: Number(p || 1),
      list: titleList
    }
  }
})

/**
 * 获取小说全部章节
 * https://www.biquge.com.cn/book/58862/
 */
router.get('/api/getNovelChapterList', async ctx => {
  const query = Object.assign({}, ctx.request.query)
  const { novelHref } = query

  const result = await httpRequest({
    url: `https://www.biquge.com.cn${novelHref}`
  })

  const htmlStr = result.text
  const novelChapterList = getNovelChapterList(htmlStr)

  ctx.body = {
    code: 200,
    msg: '获取成功',
    data: novelChapterList
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
  const novelContent = getNovelChapterContent(htmlStr)

  ctx.body = {
    code: 200,
    msg: '获取成功',
    data: novelContent
  }
})

/**
 * 下载小说
 * 获取小说全部章节  https://www.biquge.com.cn/book/58862/
 *
 */
router.post('/api/downloadNovel', async ctx => {
  const reqBody = Object.assign({}, ctx.request.body)
  const { novelHref, novelName } = reqBody
  // 1. 每下载一次，则把小说的名称信息写入到文件中
  const titleFile = path.resolve(__dirname, '../novels/title.json')
  const titleListStr = fs.readFileSync(titleFile, 'UTF-8').toString()
  const titleList = JSON.parse(titleListStr)
  // 2. 判断是否已经下载过
  const isDownloaded = titleList.some(item => item.novelHref === novelHref)
  if (isDownloaded) {
    ctx.body = {
      code: 200,
      msg: '已下载过'
    }
  } else {
    titleList.push(reqBody)
    try {
      // 3. 写入 title.json
      fs.writeFileSync(titleFile, JSON.stringify(titleList), err => {
        if (err) {
          console.log(err)
        }
      })
      // 4. 根据文章title下载所有的小说章节
      const result = await httpRequest({
        url: `https://www.biquge.com.cn${novelHref}`
      })
      const htmlStr = result.text
      const novelChapterList = getNovelChapterList(htmlStr)
      const novelChapterListLen = novelChapterList.length
      const novelChapterAll = []
      for (let i = 0; i < 100; i++) {
        const chapterItem = novelChapterList[i]
        const chapterRes = await httpRequest({
          url: `https://www.biquge.com.cn${chapterItem.novelChapterHref}`
        })
        const novelChapterHtmlStr = chapterRes.text
        const novelChapterContent = getNovelChapterContent(novelChapterHtmlStr)
        novelChapterAll.push({
          ...chapterItem,
          novelChapterContent
        })
      }
      // 5. 生成小说 chapter json
      const downloadNovelFile = path.resolve(
        __dirname,
        `../novels/${novelName}.json`
      )
      fs.writeFileSync(
        downloadNovelFile,
        JSON.stringify(novelChapterAll),
        err => {
          if (err) {
            console.log(err)
          }
        }
      )

      ctx.body = {
        code: 200,
        msg: '下载完成',
        data: {}
      }
    } catch (err) {
      ctx.body = {
        code: 500,
        msg: '下载失败～'
      }
    }
  }
})

// 获取全部小说章节
function getNovelChapterList(htmlStr) {
  const novelChapterList = []
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
  return novelChapterList
}

// 获取章节小说内容
function getNovelChapterContent(htmlStr) {
  const $ = cheerio.load(htmlStr)
  const novelContent = $('#content').html()
  return novelContent
}

function httpRequest({ url, method = 'get', params = {} }) {
  return new Promise((resolve, reject) => {
    sp[method](url).end((req, res) => {
      resolve(res)
    })
  }).catch(err => {
    console.log(err)
  })
}

module.exports = router
