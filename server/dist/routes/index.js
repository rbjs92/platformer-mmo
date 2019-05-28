"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const AuthControllerPolicy_1 = __importDefault(require("../policies/AuthControllerPolicy"));
const { onTokenSetUser, isLoggedIn } = require('../middlewares');
module.exports = (app) => {
    app.use(onTokenSetUser);
    app.post('/api/auth/register', AuthControllerPolicy_1.default.register, AuthController_1.default.register);
    app.post('/api/auth/login', AuthController_1.default.login);
    app.get('/api/user/profile', isLoggedIn, UserController_1.default.profile);
};
