const HttpRequest = require("./HttpRequest");
const FileHandler = require("./FileHandler");
const {isEmpty,isEmail,isNumber,isDateTime,httpBuildQuery, isPhoneNumber, isMobileNumber, formatPhoneNumber, formatMobileNumber} = require("./UsefulStuff");
const {Map} = require("./Mapper");

module.exports = { HttpRequest, FileHandler, isEmpty, isEmail, isNumber, isPhoneNumber, isMobileNumber, formatPhoneNumber, formatMobileNumber, isDateTime, httpBuildQuery, Map };