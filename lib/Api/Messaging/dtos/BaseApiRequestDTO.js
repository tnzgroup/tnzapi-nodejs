class BaseApiRequestDTO
{
    //ErrorEmailNotify; // Use ReportTo instead
    ReportTo;

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