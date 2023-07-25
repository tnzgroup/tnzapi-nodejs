const functions = require("../../../Functions");

const BaseApiRequestDTO = require('./BaseApiRequestDTO');

class FaxApiRequestDTO extends BaseApiRequestDTO
{
    Resolution;
    CSID;
    StampFormat;
    WatermarkFirstPage;
    WatermarkAllPages;
    RetryAttempts = 3;
    RetryPeriod = 1;
    Message;

    Files = [];

    constructor(data)
    {
        super();

        functions.Map(this,data);
    }
}

module.exports = FaxApiRequestDTO;