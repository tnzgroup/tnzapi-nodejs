const functions = require("../../Functions");

const SMSReceivedApiRequestDTO = require("./dtos/SMSReceivedApiRequestDTO");

function SMSReceivedApi(args)
{
    let url = `${args.URL}/sms/received`;

    let entity = new SMSReceivedApiRequestDTO(args);

    let Error = "";

    // Send message & fire callback when response comes back
    this.Poll = (args) => {

        functions.Map(entity,args);

        return new Promise(async (callback) =>{

            if( this.Validated() )
            {
                let data = {
                    AuthToken: entity.AuthToken,
                    HTTPMethod: "GET"
                };
    
                let params = {
                    "recordsPerPage": entity.RecordsPerPage,
                    "page": entity.Page
                };
    
                if(!functions.isEmpty(entity.DateFrom) && !functions.isEmpty(entity.DateTo))
                {
                    params["dateFrom"] = entity.DateFrom;
                    params["dateTo"] = entity.DateTo;
                }
                else
                {
                    params["timePeriod"] = entity.TimePeriod;
                }
    
                url = `${url}?${functions.httpBuildQuery(params)}`;
        
                functions.HttpRequest(url,data,callback);
            }
            else
            {
                callback({
                    "Result": "Error",
                    "ErrorMessage": [Error]
                });
            }
            
        });
    };

    this.Validated = () => {

        if( functions.isEmpty(entity.AuthToken) )
        {
            Error = "Missing AuthToken";
            return false;
        }
        if( functions.isEmpty(entity.TimePeriod) && functions.isEmpty(entity.DateFrom) && functions.isEmpty(entity.DateTo) )
        {
            Error = "Missing TimePeriod or DateFrom & DateTo";
            return false;
        }
        if( !functions.isNumber(entity.TimePeriod) )
        {
            Error = "TimePeriod must be a number - number of minutes";
            return false;
        }
        if( !functions.isEmpty(entity.DateFrom) && !functions.isDateTime(entity.DateFrom) )
        {
            Error = "DateFrom must be datetime format";
            return false;
        }
        if( !functions.isEmpty(entity.DateTo) && !functions.isDateTime(entity.DateTo) )
        {
            Error = "DateTo must be datetime format";
            return false;
        }
        if( !functions.isNumber(entity.RecordsPerPage) )
        {
            Error = "RecordsPerPage must be a number";
            return false;
        }
        if( entity.RecordsPerPage < 0 || entity.RecordsPerPage > 999 )
        {
            Error = "RecordsPerPage must be between 0 and 999";
            return false;
        }
        if( !functions.isNumber(entity.Page) )
        {
            Error = "Page must be a number";
            return false;
        }
        if( entity.Page < 0 )
        {
            Error = "Page must be greater then 0";
            return false;
        }

        return true;
    };

    return this;
}

module.exports = SMSReceivedApi;