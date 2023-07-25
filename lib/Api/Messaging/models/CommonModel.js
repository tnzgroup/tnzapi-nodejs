const functions = require("../../../Functions");

class CommonModel
{
    AuthToken;

    MessageID;
    Reference;
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