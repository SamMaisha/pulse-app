const db = require("../index");

// get opportunities for user
const getOpportunities = function (userId) {
  queryParams = [userId];
  parameterizedQuery = `
  SELECT * FROM opportunities
  WHERE user_id = $1
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
    return data.rows;
  });
};

// add new opportunity to db
const addOpportunity = function (userId, name, date, notes) {
  const queryParams = [userId, name, date, notes];
  const parameterizedQuery = `
  INSERT INTO opportunities (user_id, name, date, notes)
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
    return data.rows[0];
  });
};

// update opportunity in db
const updateOpportunity = function (
  userId,
  opportunityId,
  newName,
  newDate,
  newNote
) {
  const queryParams = [userId, opportunityId, newName, newDate, newNote];
  const parameterizedQuery = `
  UPDATE opportunities
  SET name = $3, date = $4, notes = $5
  WHERE id = $2 AND user_id = $1
  RETURNING *
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
    return data.rows[0];
  });
};

// delete opportunity from db
const deleteOpportunity = function (userId, opportunityId) {
  const queryParams = [userId, opportunityId];
  const parameterizedQuery = `
  DELETE FROM opportunities
  WHERE id = $2 AND user_id = $1
  `;
  return db.query(parameterizedQuery, queryParams);
};

module.exports = {
  getOpportunities,
  addOpportunity,
  updateOpportunity,
  deleteOpportunity,
};
