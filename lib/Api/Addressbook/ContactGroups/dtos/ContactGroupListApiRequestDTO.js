const functions = require("../../../../Functions");
const BaseListApiRequestDTO = require("./BaseListApiRequestDTO");

class ContactGroupListModel extends BaseListApiRequestDTO
{
    constructor(data)
    {
        super();

        functions.Map(this,data);
    }
}

module.exports = ContactGroupListModel;