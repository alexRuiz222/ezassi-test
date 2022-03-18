"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkflows = void 0;
const dbconfig_1 = require("../db/dbconfig");
const getWorkflows = async (req, res) => {
    let { limit = 30, from = 0, order = 'asc', order_field = 'name', search = '', search_fields = '["name"]', exceptions = '[]' } = req.query;
    limit = limit > 0 ? `LIMIT ${limit} OFFSET ${from}` : '';
    try {
        dbconfig_1.db.query(`SELECT * from  workflow WHERE status = true  ${limit}   ;`, function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            return res.status(200).json({ total: results.length, workflow: results });
        });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};
exports.getWorkflows = getWorkflows;
//# sourceMappingURL=workflows.controller.js.map