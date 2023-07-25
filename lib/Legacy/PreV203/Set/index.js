function Set(args)
{
    this.AuthToken = args.AuthToken;
    this.Sender = args.Sender;
    this.APIKey = args.APIKey;
    this.URL = args.URL + "/set";

    this.Abort = require("./Abort");
    this.Pacing = require("./Pacing");
    this.Resubmit = require("./Resubmit");
    this.Reschedule = require("./Reschedule");
    
    return this;
}

module.exports = Set;
