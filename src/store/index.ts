import { createStore } from 'vuex'

interface IModulesName {
  [key: string]: any
}

const modulesFiles = require.context('./modules', true, /\.ts$/)
const modules = modulesFiles
  .keys()
  .reduce((modules: IModulesName, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
  }, {})

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ...modules
  }
})
