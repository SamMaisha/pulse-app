const { getAllUserIds } = require('../db/queries/users')

const userValidator = function(userId) { //takes in userId, checks if the id is unique or not in database
    return getAllUserIds()
    .then(data => {
        for(const user of data)  {
            if (userId === user.auth0_id) {
                const result = true; //returns true if match is found
                return result;
            }
        }
        return false; //returns false if no match found
    })
}

module.exports = {
    userValidator
}