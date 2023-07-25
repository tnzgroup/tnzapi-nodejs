const ContactGroupCreateApi = require("./ContactGroupCreateApi");
const ContactGroupDeleteApi = require("./ContactGroupDeleteApi");
const ContactGroupDetailApi = require("./ContactGroupDetailApi");
const ContactGroupListApi = require("./ContactGroupListApi");

function ContactGroup(args)
{
    this.AuthToken = args.AuthToken;
    this.URL = `${args.URL}/contact`;

    this.Create = (args) => new ContactGroupCreateApi(this).Run(args);
    this.Delete = (args) => new ContactGroupDeleteApi(this).Run(args);
    this.Detail = (args) => new ContactGroupDetailApi(this).Run(args);
    this.List = (args) => new ContactGroupListApi(this).Run(args);
    
    return this;
}

module.exports = ContactGroup;
