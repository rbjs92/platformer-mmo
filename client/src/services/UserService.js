import Api from './Api'

export default {
  profile() {
    return Api().get('/api/user/profile')
  },
}
