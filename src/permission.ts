import router from './router'

router.beforeEach(async to => {
  const metaTilte: string = to.meta.title
  document.title = metaTilte || undefined
})
