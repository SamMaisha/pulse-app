const db = require("../index");

// get skills for user
const getSkills = function (userId) {
  queryParams = [userId];
  parameterizedQuery = `
  SELECT * FROM skills
  WHERE user_id = $1
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
    return data.rows;
  });
};

// test get skills
const testLinkSkills = function () {
  return db.query("SELECT * FROM skills;").then((data) => {
    console.log(data.rows);
    return data.rows;
  });
};
