"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    clientId: {
        type: String,
        unique: true,
    },
    location: {
        type: String,
        required: true,
        default: 'town',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose_1.default.model('User', UserSchema);
User.prototype.hashPassword = function (password) {
    return bcrypt_1.default.hashSync(password, 10);
};
User.prototype.comparePassword = function (password) {
    return bcrypt_1.default.compareSync(password, this.password);
};
module.exports = User;
