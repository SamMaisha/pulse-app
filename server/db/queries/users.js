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
            `INSERT INTO users (userId, name, email) VALUES ($1, $2, $3) RETURNING *`, [user.sub, user.name, user.email])
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
            `SELECT userId FROM users`)
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