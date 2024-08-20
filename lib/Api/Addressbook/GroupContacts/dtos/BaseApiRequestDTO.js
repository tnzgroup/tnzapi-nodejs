const CommonApiRequestDTO = require("../../../../Common/dtos/CommonApiRequestDTO")

class BaseApiRequestDTO extends CommonApiRequestDTO
{
    Group;
    GroupID;
}

module.exports = BaseApiRequestDTO;