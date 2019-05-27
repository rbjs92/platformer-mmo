import AuthController from '../controllers/AuthController'
import UserController from '../controllers/UserController'

import AuthControllerPolicy from '../policies/AuthControllerPolicy'

const { onTokenSetUser, isLoggedIn } = require('../middlewares')

export = (app: any) => {
  app.use(onTokenSetUser)
  app.post('/api/auth/register', AuthControllerPolicy.register, AuthController.register)
  app.post('/api/auth/login', AuthController.login)
  app.get('/api/user/profile', isLoggedIn, UserController.profile)
}
