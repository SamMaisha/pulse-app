const db = require("../index");

// get careers for user
const getCareers = function (userId) {
  queryParams = [userId];
  parameterizedQuery = `
  SELECT * FROM careers
  WHERE user_id = $1
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
    return data.rows;
  });
};

// add new career entry to db
const addCareer = function (userId, jobTitle, companyName, jobLink, notes) {
  const queryParams = [userId, jobTitle, companyName, jobLink, notes];
  const parameterizedQuery = `
  INSERT INTO careers (user_id, job_title, company_name, job_link, notes)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
    // return object
    return data.rows[0];
  });
};

// update career entry in db
const updateCareer = function (userId, careerId, new, newStatus) {
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

// delete career from db
const deleteCareer = function (userId, careerId) {
  const queryParams = [userId, careerId];
  const parameterizedQuery = `
  DELETE FROM careers
  WHERE id = $2 AND user_id = $1
  `;
  return db.query(parameterizedQuery, queryParams);
};

// test get career
const testGetCareer = function () {
  return db.query("SELECT * FROM careers;").then((data) => {
    console.log(data.rows);
    return data.rows;
  });
};

module.exports = {
  testGetCareer,
  getCareers,
  addCareer,
  deleteCareer
};
