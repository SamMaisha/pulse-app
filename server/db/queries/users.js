const db = require("../index");

//Function to query db and add a user to the db
const addUser = function (user) {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO users (auth0_id, name) VALUES ($1, $2) RETURNING *`, [
      user.sub,
      user.name,
    ])
      .then((result) => {
        let newUser = result.rows;
        resolve(newUser);
      })
      .catch((err) => {
        reject(console.log(err.message));
      });
  });
};


/*Function to query the database, 
and return all userIDs in database, 
which the return array will be looped 
over to find a match*/

const getAllUserIds = function () {
  return new Promise((resolve, reject) => {
    db.query(`SELECT auth0_id FROM users`)
      .then((result) => {
        let allUserIds = result.rows;
        resolve(allUserIds);
      })
      .catch((err) => {
        reject(console.log(err.message));
      });
  });
};


//Query to return user information from database 
const getUserInfo = function (auth0Id) {
  const queryParams = [auth0Id];
  const parameterizedQuery = `
  SELECT * from users
  WHERE auth0_id = $1
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
    console.log(data.rows[0]);
    return data.rows;
  });
};

module.exports = {
  addUser,
  getAllUserIds,
  getUserInfo,
};
