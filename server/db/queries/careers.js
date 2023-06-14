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
const addCareer = function (
  userId,
  jobTitle,
  companyName,
  jobLink,
  isCoverLetterGenerated,
  isApplied,
  isInterviewed,
  notes
) {
  const queryParams = [
    userId,
    jobTitle,
    companyName,
    jobLink,
    isCoverLetterGenerated,
    isApplied,
    isInterviewed,
    notes,
  ];
  const parameterizedQuery = `
  INSERT INTO careers (user_id, job_title, company_name, job_link, is_coverletter_generated, is_applied, is_interviewed, notes)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
    // return object
    return data.rows[0];
  });
};

// update career entry in db
const updateCareer = function (
  userId,
  careerId,
  jobTitle,
  companyName,
  jobLink,
  isCoverLetterGenerated,
  isApplied,
  isInterviewed,
  notes
) {
  const queryParams = [
    userId,
    careerId,
    jobTitle,
    companyName,
    jobLink,
    isCoverLetterGenerated,
    isApplied,
    isInterviewed,
    notes,
  ];
  const parameterizedQuery = `
  UPDATE careers
  SET job_title = $3, company_name = $4, job_link = $5, is_coverletter_generated = $6, is_applied = $7, is_interviewed = $8, notes = $9
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
  updateCareer,
  deleteCareer,
};
