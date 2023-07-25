const functions = require("../../../Functions");
const CommonModel = require("./CommonModel");

class EmailModel extends CommonModel {

    EmailSubject;
    SMTPFrom;
    From;
    FromEmail;
    CCEmail;
    ReplyTo;
    MessagePlain;
    MessageHTML;
    Files = [];

    // Attachments will be file locations
    Attachments = [];

    constructor(data)
    {
        super();

        functions.Map(this,data);
    }
}

module.exports = EmailModel;