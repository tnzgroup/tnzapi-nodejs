const functions = require("../../../../Functions");

class GroupApiResponseDTO
{
    Result;
    Group;

    constructor(data)
    {
        functions.Map(this,data);
    }
}

module.exports = GroupApiResponseDTO;