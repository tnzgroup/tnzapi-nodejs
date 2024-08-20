const CommonListApiRequestDTO = require("../../../../Common/dtos/CommonListApiRequestDTO")

class BaseListApiRequestDTO extends CommonListApiRequestDTO
{
    Group;
    GroupID;
}

module.exports = BaseListApiRequestDTO;