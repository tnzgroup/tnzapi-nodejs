const functions = require("../../../Functions");
const CommonListApiRequestDTO = require("../../../Common/dtos/CommonListApiRequestDTO");

class SMSReceivedApiRequestDTO extends CommonListApiRequestDTO
{
    TimePeriod = 1440;
    DateFrom = null;
    DateTo = null;

    constructor(data)
    {
        super();
        
        functions.Map(this,data);
    }
}

module.exports = SMSReceivedApiRequestDTO;