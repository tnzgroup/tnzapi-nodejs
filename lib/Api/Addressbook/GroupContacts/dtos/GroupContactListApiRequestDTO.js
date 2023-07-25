const functions = require("../../../../Functions");
const BaseListApiRequestDTO = require("./BaseListApiRequestDTO");

class GroupContactListApiRequestDTO extends BaseListApiRequestDTO
{
    constructor(data)
    {
        super();

        functions.Map(this,data);
    }
}

module.exports = GroupContactListApiRequestDTO;