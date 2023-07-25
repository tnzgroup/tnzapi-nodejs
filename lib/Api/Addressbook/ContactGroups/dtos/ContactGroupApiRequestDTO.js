const functions = require("../../../../Functions");
const BaseApiRequestDTO = require("./BaseApiRequestDTO");

class ContactGroupCRDModel extends BaseApiRequestDTO
{
    GroupCode;

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
      
      // Omit the ContactID property from the copy
      delete copy.ContactID;
      
      return copy;
    }
}

module.exports = ContactGroupCRDModel;