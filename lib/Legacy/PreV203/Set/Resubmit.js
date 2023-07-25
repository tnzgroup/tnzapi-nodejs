const functions = require("../../../Functions");

function Resubmit(args)
{
    let url = this.URL + "/resubmit";

    this.MessageID = "";
    this.SendTime = "";

    for(let name in args)
    {
        this[name] = args[name];
    }

    // Send message & fire callback when response comes back
    this.SendRequest = (callback) => {

        if( this.Validated() )
        {
            let data = {
                "AuthToken": this.AuthToken,
                "Sender": this.Sender,
                "APIKey": this.APIKey,
                "MessageID": this.MessageID,
                "SendTime": this.SendTime
            };

            if( !functions.isEmpty(this.AuthToken) )
            {
                data.HTTPMethod = "PATCH";

                url += "/" + data.MessageID;

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
        if( !functions.isEmpty(this.SendTime) && !functions.isDateTime(this.SendTime) )
        {
            this.Error = "Unable to parse SendTime. Use YYYY-MM-DD hh:mm format."
            return false;
        }

        return true;
    };

    return this;
}

module.exports = Resubmit;