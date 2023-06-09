const { getAllUserIds } = require('../db/queries/users')

const userValidator = function(userId) {
    return getAllUserIds()
    .then(data => {
        for(const user of data)  {
            if (userId === user.sub) {
                const result = true;
                return result;
            }
        }
        const result = false;
        return false;
    })
}

module.exports = {
    userValidator
}