const GroupContactCreateApi = require("./GroupContactCreateApi");
const GroupContactDeleteApi = require("./GroupContactDeleteApi");
const GroupContactDetailApi = require("./GroupContactDetailApi");
const GroupContactListApi = require("./GroupContactListApi");

function GroupContact(args)
{
    this.AuthToken = args.AuthToken;
    this.URL = `${args.URL}/group`;

    this.Create = (args) => new GroupContactCreateApi(this).Run(args);
    this.Delete = (args) => new GroupContactDeleteApi(this).Run(args);
    this.Detail = (args) => new GroupContactDetailApi(this).Run(args);
    this.List = (args) => new GroupContactListApi(this).Run(args);
    
    return this;
}

module.exports = GroupContact;
