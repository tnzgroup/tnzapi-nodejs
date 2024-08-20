const functions = require("../../../../Functions");
const CommonRequestDTO = require("../../../../Common/dtos/CommonApiRequestDTO");
const GroupModel = require("../models/GroupModel");

class GroupApiRequestDTO extends CommonRequestDTO
{
    constructor(data)
    {
        super();

        // Apply properties and methods from ContactModel
        const groupModelInstance = new GroupModel(data);
        Object.assign(this, groupModelInstance); 

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