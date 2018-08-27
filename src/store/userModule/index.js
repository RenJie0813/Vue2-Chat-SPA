import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import user from './state'

const userModule={
  getters:getters,
  actions:actions,
  mutations:mutations,
  state:user
}

export default userModule;
