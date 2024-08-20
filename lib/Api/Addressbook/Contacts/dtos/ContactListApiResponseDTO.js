const functions = require("../../../../Functions");

class ContactListApiResponseDTO
{
    Result;

    TotalRecords;
    RecordsPerPage;
    PageCount;
    Page;

    Contacts;

    constructor(data)
    {
        functions.Map(this,data);
    }
}

module.exports = ContactListApiResponseDTO;