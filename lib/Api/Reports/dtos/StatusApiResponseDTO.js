const functions = require("../../../Functions");

const CommonApiResponseDTO = require("../../../Common/dtos/CommonApiResponseDTO");

class StatusApiResponseDTO extends CommonApiResponseDTO
{
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
    Count;
    Complete;
    Success;
    Failed;
    Price;
    TotalRecords;
    RecordsPerPage;
    PageCount;
    Page;
    Recipients =[];

    constructor(data)
    {
        super();
        
        functions.Map(this,data);
    }
}

module.exports = StatusApiResponseDTO;