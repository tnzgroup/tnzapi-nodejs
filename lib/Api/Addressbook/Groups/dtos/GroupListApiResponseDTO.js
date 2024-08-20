const functions = require("../../../../Functions");

class GroupListApiResponseDTO
{
    Result;

    TotalRecords;
    RecordsPerPage;
    PageCount;
    Page;

    Groups;

    constructor(data)
    {
        functions.Map(this,data);
    }
}

module.exports = GroupListApiResponseDTO;