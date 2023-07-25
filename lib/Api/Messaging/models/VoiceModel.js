const functions = require("../../../Functions");
const CommonModel = require("./CommonModel");

class VoiceModel extends CommonModel {

    CallerID;
    BillingAccount;
    ReportTo;
    RetryAttempts = 1;
    RetryPeriod = 1;

    MessageToPeople;
    MessageToAnswerphones;
    CallRouteMessageToPeople;
    CallRouteMessageToOperators;
    CallRouteMessageOnWrongKey;

    NumberOfOperators = 0;
    TTSVoice = "English-NewZealand@Female1";
    Options;
    Keypads = [];

    VoiceFiles = [];

    constructor(data)
    {
        super();

        functions.Map(this,data);

        // args(data) has Voice=VoiceApi() so this is little hack to set Voice=[TTS Engine]

        this.Voice = this.TTSVoiceType;
    }
}

module.exports = VoiceModel;