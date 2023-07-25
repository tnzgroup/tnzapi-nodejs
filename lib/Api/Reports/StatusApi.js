const functions = require("../../Functions");

const StatusApiRequestDTO = require('./dtos/StatusApiRequestDTO');

function StatusApi(args)
{
    let url = `${args.URL}/status`;

    let entity = new StatusApiRequestDTO(args);

    let Error = "";

    // Send message & fire callback when response comes back
    this.Poll = async (args) => {

        functions.Map(entity,args);

        return new Promise(async (callback) =>{
            if( this.Validated() )
            {
                let data = {
                    AuthToken: entity.AuthToken,
                    HTTPMethod: "GET"
                };
    
                url = `${url}/${entity.MessageID}/?recordsPerPage=${entity.RecordsPerPage}&page=${entity.Page}`;
          
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
            Error = "Missing Auth Token";
            return false;
        }
        if( functions.isEmpty(entity.MessageID) )
        {
            Error = "Missing MessageID";
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

module.exports = StatusApi;