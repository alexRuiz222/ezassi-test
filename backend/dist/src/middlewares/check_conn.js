"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = require("../db/dbconfig");
const db_check_connection = async (req, res, next) => {
    try {
        if (dbconfig_1.db.state == 'authenticated') {
            next();
        }
        else {
            return res.status(400).json({ msg: 'Database error connection', msg_es: 'erro en la conexión con la base de datos' });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};
exports.default = db_check_connection;
//# sourceMappingURL=check_conn.js.map