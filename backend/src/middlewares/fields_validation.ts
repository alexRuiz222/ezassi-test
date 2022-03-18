import { NextFunction, Response, Request } from "express";
import { ValidationError, validationResult } from "express-validator";

const fieldsValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(({ location, msg, param, value, nestedErrors }: ValidationError) => {
        return { param, location, msg: msg.msg, msg_es: msg.msg_es };
    });

    if (!errors.isEmpty()) { return res.status(400).json(errors.array()); }

    next();
}
export default fieldsValidation;