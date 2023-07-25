const functions = require("../../../Functions");
const CommonModel = require("./CommonModel");

class FaxModel extends CommonModel {

    Resolution;
    CSID;
    StampFormat;
    WatermarkFolder;
    WatermarkFirstPage;
    WatermarkAllPages;
    RetryAttempts = 3;
    RetryPeriod = 1;
    Message;
    Files = [];

    // Attachments will be file locations
    Attachments = [];

    constructor(data)
    {
        super();

        functions.Map(this,data);
    }
}

module.exports = FaxModel;