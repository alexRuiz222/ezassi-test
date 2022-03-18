import { db } from "../db/dbconfig";
const db_check_connection = async (req: any, res: any, next: any) => {
    try {
        if (db.state == 'authenticated') {
            next();
        } else {
            return res.status(400).json({ msg: 'Database error connection', msg_es: 'erro en la conexión con la base de datos' });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

export default db_check_connection;