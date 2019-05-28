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
const User_1 = __importDefault(require("../models/User"));
module.exports = {
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.user;
                const user = yield User_1.default.findOne({ email });
                res.send({
                    username: user.username,
                    location: user.location,
                });
            }
            catch (err) {
                res.status(500).send({ error: 'This is probably a server problem' });
            }
        });
    },
};
