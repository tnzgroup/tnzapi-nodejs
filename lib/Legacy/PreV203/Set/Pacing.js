const functions = require("../../../Functions");

function Pacing(args)
{
    let url = this.URL + "/pacing";

    this.MessageID = "";
    this.NumberOfOperators = 5;

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
                "NumberOfOperators": this.NumberOfOperators
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
        if( !functions.isNumber(this.NumberOfOperators) )
        {
            this.Error = "NumberOfOperators must be a number";
            return false;
        }

        return true;
    };

    return this;
}

module.exports = Pacing;