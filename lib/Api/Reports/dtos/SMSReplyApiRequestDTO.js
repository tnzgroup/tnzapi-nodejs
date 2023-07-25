const functions = require("../../../Functions");
const CommonListApiRequestDTO = require("../../../Common/dtos/CommonListApiRequestDTO");

class SMSReplyApiRequestDTO extends CommonListApiRequestDTO
{
    MessageID;

    constructor(data)
    {
        super();

        functions.Map(this,data);
    }
}

module.exports = SMSReplyApiRequestDTO;