const functions = require("../../../Functions");
const CommonListApiResponseDTO = require("../../../Common/dtos/CommonListApiResponseDTO");

class SMSReplyApiRequestDTO extends CommonListApiResponseDTO
{
    Result;
    MessageID;
    Status;
    JobNum;
    Account;
    SubAccount;
    Department;
    Reference;
    CreatedTimeLocal;
    CreatedTimeUTC;
    DelayedTimeLocal;
    DelayedTimeUTC;
    Timezone;
    Count = 0;
    Complete = 0;
    Success = 0;
    Failed = 0;
    Price = 0;
    Recipients = [];

    constructor(data)
    {
        super();

        functions.Map(this,data);
    }
}

module.exports = SMSReplyApiRequestDTO;