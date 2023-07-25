const AbortApi = require("./AbortApi");
const PacingApi = require("./PacingApi");
const ResubmitApi = require("./ResubmitApi");
const RescheduleApi = require("./RescheduleApi");

function Actions(args)
{
    this.AuthToken = args.AuthToken;
    this.Sender = args.Sender;
    this.APIKey = args.APIKey;
    this.URL = args.URL + "/set";

    this.Abort = new AbortApi(this);
    this.Pacing = new PacingApi(this);
    this.Resubmit = new ResubmitApi(this);
    this.Reschedule = new RescheduleApi(this);
    
    return this;
}

module.exports = Actions;
