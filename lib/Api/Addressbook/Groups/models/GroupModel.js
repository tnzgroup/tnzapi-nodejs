const functions = require("../../../../Functions");

class GroupModel
{
    GroupID;

    GroupCode;
    GroupName;
    SubAccount;
    Department;
    Owner;
    
    ViewEditBy;
    AccessControl;

    CreatedTimeLocal;
    CreatedTimeUTC;
    Timezone;

    constructor(data)
    {
        if( !functions.isEmpty(data.Group) )
        {
            functions.Map(this,data.Group);

            return;
        }

        functions.Map(this,data);
    }
}

module.exports = GroupModel;