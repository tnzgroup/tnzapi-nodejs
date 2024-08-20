const functions = require("../../../../Functions");

class ContactGroupApiResponseDTO
{
    Result;
    
    Group;
    Contact;

    constructor(data)
    {
        functions.Map(this,data);
    }
}

module.exports = ContactGroupApiResponseDTO;