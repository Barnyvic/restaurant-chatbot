const moment = require('moment');


const formatMessageAndTime = (user, message) => {
 return {
     user,
     message,
     time: moment().format('h:mm a'),
 };
}

module.exports = {
    formatMessageAndTime,
};