const functions = require("../../../Functions");
const CommonListApiResponseDTO = require("../../../Common/dtos/CommonListApiResponseDTO");

class SMSReceivedApiResponseDTO extends CommonListApiResponseDTO
{
    Messages = [];

    constructor(data)
    {
        super();
        
        functions.Map(this,data);
    }
}

module.exports = SMSReceivedApiResponseDTO;