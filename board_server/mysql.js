const mysql = require('mysql2/promise');

const config = {
    host: '117.52.20.73',
    user: 'prj_test_user',
    database: 'prj_test_db',
    password: 'dbtoprj#2022'
}

const mySqlConnection = {
    query : async function(query) {
        const connection = await mysql.createConnection(config);
        try {
            let rows = await connection.execute(query);
            return rows;
        } catch (err) {
            return null;
        } finally {
            connection.end();
        }
    }
};

module.exports = mySqlConnection;