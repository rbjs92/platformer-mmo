"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('useCreateIndex', true); // removes deprecation warning
const db = process.env.MONGO_DB;
module.exports = {
    init() {
        mongoose_1.default
            .connect(db, { useNewUrlParser: true })
            .then(() => console.log('Connected to MongoDB.'))
            .catch((err) => console.log(err));
    },
};
