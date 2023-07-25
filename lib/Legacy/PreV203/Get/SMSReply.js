const functions = require("../../../Functions");

function SMSReply(args)
{
    let url = this.URL + "/sms/reply";

    this.MessageID = "";

    for(let name in args)
    {
        this[name] = args[name];
    }

    // Send message & fire callback when response comes back
    this.Poll = (callback) => {

        if( this.Validated() )
        {
            let data = {
                "AuthToken": this.AuthToken,
                "Sender": this.Sender,
                "APIKey": this.APIKey,
                "MessageID": this.MessageID
            };

            if( !functions.isEmpty(this.AuthToken) )
            {
                url = url + "/" + data.MessageID;

                data.HTTPMethod = "GET";

                delete data.MessageID;
            }
    
            functions.HttpRequest(url,data,callback);
        }
        else
        {
            callback({
                "Result": "Error",
                "ErrorMessage": this.Error
            });
        }
    };

    this.Validated = () => {

        if( functions.isEmpty(this.AuthToken) )
        {
            if( functions.isEmpty(this.Sender) )
            {
                this.Error = "Missing Sender";
                return false;
            }
            if( functions.isEmpty(this.APIKey) )
            {
                this.Error = "Missing APIKey";
                return false;
            }
        }
        if( functions.isEmpty(this.MessageID) )
        {
            this.Error = "Missing MessageID";
            return false;
        }

        return true;
    };

    return this;
}

module.exports = SMSReply;