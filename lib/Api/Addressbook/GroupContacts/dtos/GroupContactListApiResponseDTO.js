const functions = require("../../../../Functions");

class GroupContactListApiResponseDTO
{
    Result;
    
    TotalRecords;
    RecordsPerPage;
    PageCount;
    Page;

    Group;
    Contacts;

    constructor(data)
    {
        functions.Map(this,data);
    }
}

module.exports = GroupContactListApiResponseDTO;