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
module.exports = {
    onTokenSetUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield req.get('authorization').split(' ')[1];
                if (token) {
                    const user = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
                    req.user = user;
                    next();
                }
            }
            catch (err) {
                next();
            }
        });
    },
    isLoggedIn(req, res, next) {
        if (req.user) {
            next();
        }
        else {
            res.status(401).json({ error: 'Sorry, you are not allowed' });
        }
    },
    notFound(req, res, next) {
        res.status(404);
        const error = new Error(`Not Found - ${req.originalUrl}`);
        next(error);
    },
    errorHandler(err, req, res) {
        const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
        res.status(statusCode);
        res.json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? 'Please change to dev mode to trace the error.' : err.stack,
        });
    },
};
