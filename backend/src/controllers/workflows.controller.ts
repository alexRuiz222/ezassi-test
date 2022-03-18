import { Response, Request, response, request } from 'express';
import { db } from '../db/dbconfig';

const getWorkflows = async (req: Request, res: Response) => {
  let { limit = 30, from = 0, order = 'asc', order_field = 'name', search = '', search_fields = '["name"]', exceptions = '[]' }: any = req.query;
  limit = limit > 0 ? `LIMIT ${limit} OFFSET ${from}` : '';
  try {
    db.query(`SELECT * from  workflow WHERE status = true  ${limit}   ;`, function (error, results, fields) {
      if (error) {
        console.log(error);
        return;
      }
      return res.status(200).json({ total: results.length, workflow: results });
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

export { getWorkflows };