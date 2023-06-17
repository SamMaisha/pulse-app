const db = require("../index");

// get quicklinks for user
const getQuickLinks = function (userId) {
  const queryParams = [userId];
  const parameterizedQuery = `
  SELECT * FROM quick_links
  WHERE user_id = $1
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
    return data.rows;
  });
};

// add quicklinks to db
const addQuickLink = function (userId, name, url) {
  const queryParams = [userId, name, url];
  const parameterizedQuery = `
  INSERT INTO quick_links (user_id, name, url)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
    // console.log(data.rows);
    return data.rows[0];
  });
};

// update quicklink in db
const updateQuickLink = function (userId, quickLinkId, newName, newUrl) {
  const queryParams = [userId, quickLinkId, newName, newUrl];
  const parameterizedQuery = `
  UPDATE quick_links
  SET name = $3, url = $4
  WHERE id = $2 AND user_id = $1
  RETURNING *
  `;
  return db.query(parameterizedQuery, queryParams).then((data) => {
    // console.log(data.rows[0]);
    return data.rows[0];
  });
};

// delete quicklink from db
const deleteQuickLink = function (userId, quickLinkId) {
  const queryParams = [userId, quickLinkId];
  const parameterizedQuery = `
  DELETE FROM quick_links
  WHERE id = $2 AND user_id = $1
  `;
  return db.query(parameterizedQuery, queryParams);
};

// test get quicklinks
const testLink = () => {
  return db.query("SELECT * FROM quick_links;").then((data) => {
    return data.rows;
  });
};

module.exports = {
  getQuickLinks,
  testLink,
  addQuickLink,
  updateQuickLink,
  deleteQuickLink,
};
