const functions = require("../../../../Functions");
const CommonListApiRequestDTO = require("../../../../Common/dtos/CommonListApiRequestDTO")
const ContactModel = require("../models/ContactModel");

class ContactListApiRequestDTO extends CommonListApiRequestDTO
{
    constructor(data)
    {
        super();

        // Apply properties and methods from ContactModel
        const contactModelInstance = new ContactModel(data);
        Object.assign(this, contactModelInstance); 

        functions.Map(this,data);
    }
}

module.exports = ContactListApiRequestDTO;