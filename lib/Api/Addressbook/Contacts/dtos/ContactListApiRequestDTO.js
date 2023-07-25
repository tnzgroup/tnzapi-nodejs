const functions = require("../../../../Functions");
const CommonListApiRequestDTO = require("../../../../Common/dtos/CommonListApiRequestDTO")

class ContactListApiRequestDTO extends CommonListApiRequestDTO
{
    constructor(data)
    {
        super();

        functions.Map(this,data);
    }
}

module.exports = ContactListApiRequestDTO;