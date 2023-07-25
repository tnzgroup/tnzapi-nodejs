const functions = require("../../Functions");

const PacingApiRequestDTO = require('./dtos/PacingApiRequestDTO');

function PacingApi(args)
{
    let url = `${args.URL}/pacing`;

    let entity = new PacingApiRequestDTO(args);

    let error = "";

    // Send message & fire callback when response comes back
    this.SendRequest = (args) => {

        functions.Map(entity,args);

        return new Promise(async (callback) =>{
            if( this.Validated() )
            {
                let data = {
                    AuthToken: entity.AuthToken,
                    NumberOfOperators: entity.NumberOfOperators,
                    HTTPMethod: "PATCH"
                };
    
                url = `${url}/${entity.MessageID}`;
        
                functions.HttpRequest(url,data,callback);
            }
            else
            {
                callback({
                    "Result": "Error",
                    "ErrorMessage": [error]
                });
            }
        });
    };

    this.Validated = () => {

        if( functions.isEmpty(entity.AuthToken) )
        {
            error = "Missing AuthToken";
            return false;
        }
        if( functions.isEmpty(entity.MessageID) )
        {
            error = "Missing MessageID";
            return false;
        }
        if( !functions.isNumber(entity.NumberOfOperators) )
        {
            error = "NumberOfOperators must be a number";
            return false;
        }

        return true;
    };

    return this;
}

module.exports = PacingApi;