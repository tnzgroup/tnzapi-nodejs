const functions = require("../../Functions");

const AbortApiRequestDTO = require("./dtos/AbortApiRequestDTO");

function AbortApi(args)
{
    let url = `${args.URL}/abort`;

    let entity = new AbortApiRequestDTO(args);

    let error = "";

    // Send message & fire callback when response comes back
    this.SendRequest = (args) => {

        functions.Map(entity,args);

        return new Promise(async (callback) =>{
            if( this.Validated() )
            {
                let data = {
                    AuthToken: entity.AuthToken,
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

        return true;
    };

    return this;
}

module.exports = AbortApi;