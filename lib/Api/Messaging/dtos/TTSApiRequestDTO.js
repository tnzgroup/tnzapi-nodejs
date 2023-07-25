const functions = require("../../../Functions");

const BaseApiRequestDTO = require('./BaseApiRequestDTO');

class TTSApiRequestDTO extends BaseApiRequestDTO
{
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
    Voice = "English-NewZealand@Female1";
    Options;
    Keypads = [];

    constructor(data)
    {
        super();

        functions.Map(this,data);
    }
}

module.exports = TTSApiRequestDTO;