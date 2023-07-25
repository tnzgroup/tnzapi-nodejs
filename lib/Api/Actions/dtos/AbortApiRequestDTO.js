const functions = require("../../../Functions");
const BaseApiRequestDTO = require("./BaseApiRequestDTO");

class AbortApiRequestDTO extends BaseApiRequestDTO
{
    constructor(data)
    {
        super();

        functions.Map(this,data);
    }
}

module.exports = AbortApiRequestDTO;