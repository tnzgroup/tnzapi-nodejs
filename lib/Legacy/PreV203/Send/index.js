function Send(args)
{
    this.AuthToken = args.AuthToken;
    this.Sender = args.Sender;
    this.APIKey = args.APIKey;
    this.URL = args.URL + "/send";

    this.Email = require("./Email");
    this.SMS = require("./SMS");
    this.Fax = require("./Fax");
    this.Voice = require("./Voice");
    this.TTS = require("./TTS");
    
    return this;
}

module.exports = Send;
