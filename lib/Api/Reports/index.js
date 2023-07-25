const SMSReceivedApi = require("./SMSReceivedApi");
const SMSReplyApi = require("./SMSReplyApi");
const StatusApi = require("./StatusApi");

function Reports(args)
{
    this.AuthToken = args.AuthToken;
    this.Sender = args.Sender;
    this.APIKey = args.APIKey;
    this.URL = args.URL + "/get";

    this.SMSReceived = new SMSReceivedApi(this);
    this.SMSReply = new SMSReplyApi(this);
    this.Status = new StatusApi(this);
    
    return this;
}

module.exports = Reports;
