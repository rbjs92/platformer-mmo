"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const jwtSignUser = (user) => {
    return jsonwebtoken_1.default.sign({
        userId: user.id,
        email: user.email,
    }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
};
module.exports = {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, username } = req.body;
                const emailResult = yield User_1.default.findOne({ email });
                const usernameResult = yield User_1.default.findOne({ username });
                if (emailResult) {
                    return res.status(418).send({ error: 'The email is already in use' });
                }
                if (usernameResult) {
                    return res.status(400).send({ error: 'The username is already in use' });
                }
                const newUser = new User_1.default();
                newUser.email = email;
                newUser.password = yield newUser.hashPassword(password);
                newUser.username = username;
                newUser.save();
                const token = yield jwtSignUser(newUser);
                res.send({
                    user: {
                        id: newUser.id,
                        email: newUser.email,
                    },
                    token,
                });
            }
            catch (err) {
                res.status(500).send({ error: 'This may be a server problem, sorry' });
            }
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield User_1.default.findOne({ email });
                const isPasswordValid = yield user.comparePassword(password);
                if (!isPasswordValid) {
                    return res.status(401).send({ error: 'Please try again' });
                }
                const token = yield jwtSignUser(user);
                res.send({
                    user: {
                        id: user.id,
                        email: user.email,
                    },
                    token,
                });
            }
            catch (error) {
                res.status(401).send({ error: 'Please try again' });
            }
        });
    },
};
