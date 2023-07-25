const functions = require("../../../Functions");
const CommonModel = require("./CommonModel");

class SMSModel extends CommonModel {

    FromNumber;
    SMSEmailReply;
    CharacterConversion;
    Message;
    MessageText;
    Files = [];

    // Attachments will be file locations
    Attachments = [];

    constructor(data)
    {
        super();

        functions.Map(this,data);
    }
}

module.exports = SMSModel;