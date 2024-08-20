const functions = require("../../../../Functions");
const BaseApiRequestDTO = require("./BaseApiRequestDTO");

class GroupContactApiRequestDTO extends BaseApiRequestDTO
{
    Contact;
    ContactID;

    constructor(data)
    {
        super();

        functions.Map(this,data);
    }

    //
    // Remove ContactID when parsing JSON
    //
    toJSON() {
      // Create a shallow copy of the instance
      const copy = { ...this };
      
      // Omit the GroupCode property from the copy
      delete copy.GroupCode;
      
      return copy;
    }
}

module.exports = GroupContactApiRequestDTO;