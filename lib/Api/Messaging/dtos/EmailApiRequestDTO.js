const functions = require("../../../Functions");

const BaseApiRequestDTO = require('./BaseApiRequestDTO');

class EmailApiRequestDTO extends BaseApiRequestDTO
{
    EmailSubject;
    SMTPFrom;
    From;
    FromEmail;
    CCEmail;
    ReplyTo;
    MessagePlain;
    MessageHTML;

    Files = [];

    constructor(data)
    {
        super();

        functions.Map(this,data);
    }
}

module.exports = EmailApiRequestDTO;
