const functions = require("../../../Functions");
const BaseApiRequestDTO = require("./BaseApiRequestDTO");

class PacingApiRequestDTO extends BaseApiRequestDTO
{
    NumberOfOperators = 0;
    
    constructor(data)
    {
        super();
        
        functions.Map(this, data);
    }
}

module.exports = PacingApiRequestDTO;