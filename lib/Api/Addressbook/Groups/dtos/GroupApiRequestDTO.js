const functions = require("../../../../Functions");
const CommonRequestDTO = require("../../../../Common/dtos/CommonApiRequestDTO")

class GroupApiRequestDTO extends CommonRequestDTO
{
    GroupCode;
    GroupName;
    SubAccount;
    Department;
    ViewEditBy;

    constructor(data)
    {
        super();

        functions.Map(this,data);
    }

    //
    // Remove GroupCode when parsing JSON
    //
    toJSON() {
      // Create a shallow copy of the instance
      const copy = { ...this };
      
      // Omit the GroupCode property from the copy
      delete copy.GroupCode;
      
      return copy;
  }
}

module.exports = GroupApiRequestDTO;