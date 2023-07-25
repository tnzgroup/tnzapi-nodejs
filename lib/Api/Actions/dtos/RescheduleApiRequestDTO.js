const functions = require("../../../Functions");
const BaseApiRequestDTO = require("./BaseApiRequestDTO");

class RescheduleApiRequestDTO extends BaseApiRequestDTO
{
    SendTime;

    constructor(data)
    {
        super();

        functions.Map(this,data);
    }
}

module.exports = RescheduleApiRequestDTO;