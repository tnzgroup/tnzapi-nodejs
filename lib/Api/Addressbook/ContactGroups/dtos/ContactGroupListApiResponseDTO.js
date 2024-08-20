const functions = require("../../../../Functions");

class ContactGroupApiListResponseDTO
{
    Result;
    TotalRecords;
    RecordsPerPage;
    PageCount;
    Page;
    Contact;
    Groups;

    constructor(data)
    {
        functions.Map(this,data);
    }
}

module.exports = ContactGroupApiListResponseDTO;