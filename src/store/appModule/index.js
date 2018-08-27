import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import app from './state'

const appModule={
    getters:getters,
    actions:actions,
    mutations:mutations,
    state:app
}

export default appModule;
