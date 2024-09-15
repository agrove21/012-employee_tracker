const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_tracker_db',
    password: 'boot2024',
    port: 5432,
});

module.exports = pool