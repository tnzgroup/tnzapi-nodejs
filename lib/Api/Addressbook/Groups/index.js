const GroupCreateApi = require("./GroupCreateApi");
const GroupUpdateApi = require("./GroupUpdateApi");
const GroupDeleteApi = require("./GroupDeleteApi");
const GroupDetailApi = require("./GroupDetailApi");
const GroupListApi = require("./GroupListApi");

function Group(args)
{
    this.AuthToken = args.AuthToken;
    this.URL = `${args.URL}/group`;

    this.Create = (args) => new GroupCreateApi(this).Run(args);
    this.Update = (args) => new GroupUpdateApi(this).Run(args);
    this.Delete = (args) => new GroupDeleteApi(this).Run(args);
    this.Detail = (args) => new GroupDetailApi(this).Run(args);
    this.List = (args) => new GroupListApi(this).Run(args);
    
    return this;
}

module.exports = Group;
