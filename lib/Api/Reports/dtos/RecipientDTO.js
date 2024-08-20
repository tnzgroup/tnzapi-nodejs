const functions = require("../../../Functions");

class RecipientDTO {

    Type;
    DestSeq;
    Destination;
    ContactID;
    Status;
    Result;
    SentTimeLocal;
    SentTimeUTC;
    Attention;
    Company;
    Custom1;
    Custom2;
    Custom3;
    Custom4;
    Custom5;
    Custom6;
    Custom7;
    Custom8;
    Custom9;
    RemoteID;
    Price;

    constructor(data)
    {
        functions.Map(this,data);
    }
}

module.exports = RecipientDTO;