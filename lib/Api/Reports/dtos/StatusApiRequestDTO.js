const functions = require("../../../Functions");
const CommonListApiRequestDTO = require("../../../Common/dtos/CommonListApiRequestDTO");

class StatusApiRequestDTO extends CommonListApiRequestDTO
{
    MessageID;

    constructor(data)
    {
        super();
        
        functions.Map(this,data);
    }
}

module.exports = StatusApiRequestDTO;