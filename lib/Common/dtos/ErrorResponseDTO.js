const functions = require("../../Functions");

class ErrorResponseDTO
{
    Result;
    ErrorMessage;

    constructor(data)
    {
        functions.Map(this,data);
    }
}

module.exports = ErrorResponseDTO;