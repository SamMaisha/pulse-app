const db = require("../index");

// get skills for user
const getSkills = function (userId) {
  const queryParams = [userId];
  const parameterizedQuery = `
  SELECT * FROM skills
  WHERE user_id = $1
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
    return data.rows;
  });
};

// add new skill to db
const addSkill = function (userId, name, status) {
  const queryParams = [userId, name, status];
  const parameterizedQuery = `
  INSERT INTO skills (user_id, name, status)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
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

module.exports = {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
};
