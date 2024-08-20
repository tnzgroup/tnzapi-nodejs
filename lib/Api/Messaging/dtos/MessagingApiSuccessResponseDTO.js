const functions = require("../../../Functions");

class MessagingApiSuccessResponseDTO
{
    Result;
    MessageID;

    constructor(data)
    {
        functions.Map(this,data);
    }
}

module.exports = MessagingApiSuccessResponseDTO;