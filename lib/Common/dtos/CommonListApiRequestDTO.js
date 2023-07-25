const CommonApiRequestDTO = require("./CommonApiRequestDTO");

class CommonListApiRequestDTO extends CommonApiRequestDTO
{
    RecordsPerPage = 100;
    Page = 1;
}

module.exports = CommonListApiRequestDTO;
