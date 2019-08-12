import * as mysql from 'mysql'
import * as dbconfig from '../config'

const dbCon = mysql.createConnection({
    host: dbconfig.host,
    port: dbconfig.port,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database
});

export default dbCon;
