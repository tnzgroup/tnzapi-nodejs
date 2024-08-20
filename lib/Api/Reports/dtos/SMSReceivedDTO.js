const functions = require("../../../Functions");

class SMSReceivedDTO {

    ReceivedID;
    MessageID;
    JobNum;
    SubAccount;
    Department;
    ReceivedTimeLocal;
    ReceivedTimeUTC;
    From;
    ContactID;
    MessageText;
    Timezone;

    constructor(data)
    {
        functions.Map(this,data);
    }
}

module.exports = SMSReceivedDTO;