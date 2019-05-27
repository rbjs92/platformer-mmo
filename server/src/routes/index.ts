import AuthController from '../controllers/AuthController'

export = (app: any) => {
  app.post('/api/auth/register', AuthController.register)
}
