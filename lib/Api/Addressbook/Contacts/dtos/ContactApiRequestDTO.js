const functions = require("../../../../Functions");
const CommonRequestDTO = require("../../../../Common/dtos/CommonApiRequestDTO")
const ContactModel = require("../models/ContactModel");

class ContactApiRequestDTO extends CommonRequestDTO
{
    constructor(data)
    {
        super();

        // Apply properties and methods from ContactModel
        const contactModelInstance = new ContactModel(data);
        Object.assign(this, contactModelInstance); 

        functions.Map(this,data);
    }

    //
    // Remove ContactID when parsing JSON
    //
    toJSON() {
        // Create a shallow copy of the instance
        const copy = { ...this };
        
        // Omit the ContactID property from the copy
        delete copy.ContactID;
        
        return copy;
    }
}

module.exports = ContactApiRequestDTO;