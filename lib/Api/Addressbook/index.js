const Contact = require("./Contacts");
const ContactGroup = require("./ContactGroups");
const Group = require("./Groups");
const GroupContact = require("./GroupContacts");

function Addressbook(args)
{
    this.AuthToken = args.AuthToken;
    this.URL = `${args.URL}/addressbook`;

    this.Contact = new Contact(this);
    this.ContactGroup = new ContactGroup(this);
    this.Group = new Group(this);
    this.GroupContact = new GroupContact(this);
    
    return this;
}

module.exports = Addressbook;