const functions = require("../../../../Functions");

class GroupContactApiResponseDTO
{
    Result;
    Contact;
    Group;

    constructor(data)
    {
        functions.Map(this,data);
    }
}

module.exports = GroupContactApiResponseDTO;