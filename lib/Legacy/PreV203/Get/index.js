function Get(args)
{
    this.AuthToken = args.AuthToken;
    this.Sender = args.Sender;
    this.APIKey = args.APIKey;
    this.URL = args.URL + "/get";

    this.Result = require("./Result");
    this.SMSReceived = require("./SMSReceived");
    this.SMSReply = require("./SMSReply");
    this.Status = require("./Status");
    
    return this;
}

module.exports = Get;
