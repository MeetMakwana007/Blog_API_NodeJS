const validator = require('validator');


const emailCheck = (email) => {
    if (validator.isEmail(email)) return true
}

const lengthCheck = (checkString, minLength) => {
    if (checkString.length < parseInt(minLength)) return true
}
module.exports = {
    emailCheck,
    lengthCheck
}