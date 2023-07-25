const EmailApi = require("./EmailApi");
const SMSApi = require("./SMSApi");
const FaxApi = require("./FaxApi");
const TTSApi = require("./TTSApi");
const VoiceApi = require("./VoiceApi");

function Messaging(args)
{
    this.AuthToken = args.AuthToken;
    this.Sender = args.Sender;
    this.APIKey = args.APIKey;
    this.URL = args.URL + "/send";

    this.Email = new EmailApi(this);
    this.SMS = new SMSApi(this);
    this.Fax = new FaxApi(this);
    this.Voice = new VoiceApi(this);
    this.TTS = new TTSApi(this);
    
    return this;
}

module.exports = Messaging;
