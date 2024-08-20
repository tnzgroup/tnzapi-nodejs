const functions = require("../../../../Functions");

class ContactApiResponseDTO
{
    Result;
    Contact;

    constructor(data)
    {
        functions.Map(this,data);
    }
}

module.exports = ContactApiResponseDTO;