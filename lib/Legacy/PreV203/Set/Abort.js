const functions = require("../../../Functions");

function Abort(args)
{
    let url = this.URL + "/abort";

    this.MessageID = "";

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
                "MessageID": this.MessageID
            };

            if( !functions.isEmpty(this.AuthToken) )
            {
                url = url + "/" + data.MessageID;

                data.HTTPMethod = "PATCH";

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

module.exports = Abort;