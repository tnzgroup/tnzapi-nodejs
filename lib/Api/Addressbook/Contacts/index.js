const ContactCreateApi = require("./ContactCreateApi");
const ContactUpdateApi = require("./ContactUpdateApi");
const ContactDeleteApi = require("./ContactDeleteApi");
const ContactDetailApi = require("./ContactDetailApi");
const ContactListApi = require("./ContactListApi");

function Contact(args)
{
    this.AuthToken = args.AuthToken;
    this.URL = `${args.URL}/contact`;

    this.Create = (args) => new ContactCreateApi(this).Run(args);
    this.Update = (args) => new ContactUpdateApi(this).Run(args);
    this.Delete = (args) => new ContactDeleteApi(this).Run(args);
    this.Detail = (args) => new ContactDetailApi(this).Run(args);
    this.List = (args) => new ContactListApi(this).Run(args);
    
    return this;
}

module.exports = Contact;
