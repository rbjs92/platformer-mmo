"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const joi_1 = __importDefault(require("@hapi/joi"));
module.exports = {
    register(req, res, next) {
        const schema = {
            username: joi_1.default.string()
                .alphanum()
                .min(3)
                .max(30),
            email: joi_1.default.string().email({ minDomainSegments: 2 }),
            password: joi_1.default.string().regex(/^[a-zA-Z0-9]{6,30}$/),
        };
        const result = joi_1.default.validate(req.body, schema);
        if (result.error === null) {
            next();
        }
        else {
            switch (result.error.details[0].context.key) {
                case 'username':
                    res.status(400).send({
                        error: 'You must provide a valid username',
                    });
                    break;
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email',
                    });
                    break;
                case 'password':
                    res.status(400).send({
                        error: 'Password should be atleast 6 characters long',
                    });
                    break;
                default:
                    res.status(400).send({
                        error: 'Invalid request, sorry',
                    });
            }
        }
    },
};
