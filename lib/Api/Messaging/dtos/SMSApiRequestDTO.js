const functions = require("../../../Functions");

const BaseApiRequestDTO = require('./BaseApiRequestDTO');

class SMSApiRequestDTO extends BaseApiRequestDTO
{
    FromNumber;
    SMSEmailReply;
    CharacterConversion = false;
    Message;
    Files = [];

    constructor(data)
    {
        super();

        functions.Map(this,data);
    }
}

module.exports = SMSApiRequestDTO;