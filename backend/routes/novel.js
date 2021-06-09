const router = require('koa-router')()
const sp = require('superagent')

/**
 * https://www.biquge.com.cn/search.php?q=
 * 根据名称模糊查询小说名称列表
 */
router.get('/api/getNovelNameList', async ctx => {
  const query = Object.assign({}, ctx.request.query)
  console.log(query, 112)
  // sp.get('https://www.biquge.com.cn/search.php?q=1', (req, res) => {
  //   console.log(res, 121)
  // })
  ctx.body = '121'
})

module.exports = router
