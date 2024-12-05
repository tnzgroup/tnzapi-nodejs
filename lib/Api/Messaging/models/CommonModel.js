const functions = require("../../../Functions");

class CommonModel
{
    AuthToken;

    MessageID;
    Reference;
    ReportTo;
    WebhookCallbackURL;
    WebhookCallbackFormat;
    SendTime;
    TimeZone;
    SubAccount;
    Department;
    ChargeCode;

    Destinations = [];
    Mode;
}

module.exports = CommonModel;