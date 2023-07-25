class BaseApiRequestDTO
{
    ErrorEmailNotify;

    WebhookCallbackURL;
    WebhookCallbackFormat;

    MessageID;

    Reference;
    SendTime;
    TimeZone;
    SubAccount;
    Department;
    ChargeCode;

    Destinations = [];

    Mode;
}

module.exports = BaseApiRequestDTO;