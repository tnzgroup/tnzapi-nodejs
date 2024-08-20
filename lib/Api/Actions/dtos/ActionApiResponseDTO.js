const functions = require("../../../Functions");

const CommonApiResponseDTO = require("../../../Common/dtos/CommonApiResponseDTO");

class ActionApiResponseDTO extends CommonApiResponseDTO
{
    MessageID;
    Status;
    JobNum;
    Action;

    constructor(data)
    {
        super();
        
        functions.Map(this,data);
    }
}

module.exports = ActionApiResponseDTO;