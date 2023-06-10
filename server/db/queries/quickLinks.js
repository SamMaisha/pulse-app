const db = require("../index");

// get quicklinks from db for user
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

const testLink = () => {
  return db.query("SELECT * FROM quick_links;").then((data) => {
    return data.rows;
  });
};

module.exports = { getQuickLinks, testLink };
