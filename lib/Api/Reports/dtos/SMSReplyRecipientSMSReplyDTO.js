const functions = require("../../../Functions");

class SMSReplyRecipientSMSReplyDTO {

    ReceivedID;
    ReceivedTimeLocal;
    ReceivedTimeUTC;
    Timezone;
    From;
    MessageText;

    constructor(data)
    {
        functions.Map(this,data);
    }
}

module.exports = SMSReplyRecipientSMSReplyDTO;