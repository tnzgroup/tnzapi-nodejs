const functions = require("../../../Functions");

function SMSReceived(args)
{
    let url = this.URL + "/sms/received";

    this.TimePeriod = 1440;
    this.DateFrom = null;
    this.DateTo = null;
    this.RecordsPerPage = 100;
    this.Page = 1;

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
                "APIKey": this.APIKey
            };

            if( !functions.isEmpty(this.AuthToken) )
            {
                let params = {
                    "recordsPerPage": this.RecordsPerPage,
                    "page": this.Page
                };

                if(!functions.isEmpty(this.DateFrom) && !functions.isEmpty(this.DateTo))
                {
                    params["dateFrom"] = this.DateFrom;
                    params["dateTo"] = this.DateTo;
                }
                else
                {
                    params["timePeriod"] = this.TimePeriod;
                }

                url += "?" + functions.httpBuildQuery(params);

                data.HTTPMethod = "GET";
            }
            else
            {
                data["TimePeriod"] = this.TimePeriod;
                data["DateFrom"] = this.DateFrom;
                data["DateTo"] = this.DateTo;
                data["RecordsPerPage"] = this.RecordsPerPage;
                data["Page"] = this.Page;
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
        if( functions.isEmpty(this.TimePeriod) )
        {
            this.Error = "Missing TimePeriod";
            return false;
        }
        if( !functions.isNumber(this.TimePeriod) )
        {
            this.Error = "TimePeriod must be a number - number of minutes";
            return false;
        }

        return true;
    };

    return this;
}

module.exports = SMSReceived;