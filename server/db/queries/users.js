const { Pool } = require('pg');

const pool = new Pool({
    user: 'labber',
    password: 'labber',
    host: 'localhost',
    database: 'final',
    port: 5432
});

const addUser = function(user) {
    return new Promise((resolve, reject) => {
        pool
        .query(
            `INSERT INTO users (auth0_id, name) VALUES ($1, $2) RETURNING *`, [user.sub, user.name])
            .then((result) => {
                let newUser = result.rows;
                resolve(newUser);
            })
            .catch((err) => {
                reject(console.log(err.message));
        })
    }
)}

const getAllUserIds = function() {
    return new Promise((resolve, reject) => {
        pool
        .query(
            `SELECT auth0_id FROM users`)
            .then(result => {
                let allUserIds = result.rows;
                resolve(allUserIds);
            })
            .catch((err) => {
                reject(console.log(err.message));
        })
    })
}


module.exports = {
    addUser,
    getAllUserIds
}