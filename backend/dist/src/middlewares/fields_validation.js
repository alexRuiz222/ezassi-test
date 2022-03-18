"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const fieldsValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).formatWith(({ location, msg, param, value, nestedErrors }) => {
        return { param, location, msg: msg.msg, msg_es: msg.msg_es };
    });
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    next();
};
exports.default = fieldsValidation;
//# sourceMappingURL=fields_validation.js.map