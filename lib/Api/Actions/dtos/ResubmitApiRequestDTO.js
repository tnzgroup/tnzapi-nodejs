const functions = require("../../../Functions");
const BaseApiRequestDTO = require("./BaseApiRequestDTO");

class ResubmitApiRequestDTO extends BaseApiRequestDTO
{
    SendTime;
    
    constructor(data)
    {
        super();

        functions.Map(this,data);
    }
}

module.exports = ResubmitApiRequestDTO;