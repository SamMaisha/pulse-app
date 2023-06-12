const db = require("../index");

// get opportunities for user
const getOpportunities = function (userId) {
  queryParams = [userId];
  parameterizedQuery = `
  SELECT * FROM opportunities
  WHERE user_id = $1
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
    console.log("RESULT:", data.rows);
    return data.rows;
  });
};

// add new opportunity to db
const addSkill = function (userId, name, status) {
  const queryParams = [userId, name, status];
  const parameterizedQuery = `
  INSERT INTO skills (user_id, name, status)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
    console.log(data.rows);
    return data.rows[0];
  });
};

// update skill in db
const updateSkill = function (userId, skillId, newName, newStatus) {
  const queryParams = [userId, skillId, newName, newStatus];
  const parameterizedQuery = `
  UPDATE skills
  SET name = $3, status = $4
  WHERE id = $2 AND user_id = $1
  RETURNING *
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
    console.log(data.rows);
    return data.rows[0];
  });
};

// delete skill from db
const deleteSkill = function (userId, skillId) {
  const queryParams = [userId, skillId];
  const parameterizedQuery = `
  DELETE FROM skills
  WHERE id = $2 AND user_id = $1
  `;
  return db.query(parameterizedQuery, queryParams);
};

// test get skills
const testLinkSkills = function () {
  return db.query("SELECT * FROM skills;").then((data) => {
    console.log(data.rows);
    return data.rows;
  });
};

module.exports = {};
