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
