const functions = require("../../../../Functions");

class ContactModel
{
    ContactID;

    ViewBy;
    EditBy;
    Owner;

    CreatedTimeLocal;
    CreatedTimeUTC;
    UpdatedTimeLocal;
    UpdatedTimeUTC;
    Timezone;

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
    Postcode;
    
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

    constructor(data)
    {
        if( !functions.isEmpty(data.Contact) )
        {
            functions.Map(this,data.Contact);

            return;
        }

        functions.Map(this,data);
    }
}

module.exports = ContactModel;