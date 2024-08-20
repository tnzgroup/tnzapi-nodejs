const functions = require("../../../Functions");
const RecipientDTO = require("./RecipientDTO");

class SMSReplyRecipientDTO extends RecipientDTO {

    SMSReplies = [];

    constructor(data)
    {
        super();
        
        functions.Map(this,data);
    }
}

module.exports = SMSReplyRecipientDTO;