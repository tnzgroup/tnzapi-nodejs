const functions = require("../../../Functions");
const CommonApiRequestDTO = require("../../../Common/dtos/CommonApiRequestDTO");

class BaseApiRequestDTO extends CommonApiRequestDTO
{
    MessageID;
}

module.exports = BaseApiRequestDTO;