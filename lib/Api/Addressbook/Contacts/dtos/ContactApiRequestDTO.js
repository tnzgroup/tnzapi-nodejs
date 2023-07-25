const functions = require("../../../../Functions");
const CommonRequestDTO = require("../../../../Common/dtos/CommonApiRequestDTO")

class ContactApiRequestDTO extends CommonRequestDTO
{
    ContactID;

    Attention;
    Title;
    Company;
    RecipDepartment;
    FirstName;
    LastName;
    Position;
    StreetAddress;
    Suburb;
    City;
    State;
    Country;
    PostCode;
    MainPhone;
    AltPhone1;
    AltPhone2;
    DirectPhone;
    MobilePhone;
    FaxNumber;
    EmailAddress;
    WebAddress;
    Custom1;
    Custom2;
    Custom3;
    Custom4;

    ViewBy;
    EditBy;

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

module.exports = ContactApiRequestDTO;