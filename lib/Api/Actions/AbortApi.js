const functions = require("../../Functions");
const helpers = require("./helpers");

const AbortApiRequestDTO = require("./dtos/AbortApiRequestDTO");

function AbortApi(args)
{
    let url = `${args.URL}/abort`;

    let entity = new AbortApiRequestDTO(args);

    let error = "";

    this.HandleResponse = async (callback, responseData) => {
        callback(helpers.MapApiResponse(responseData));
    };

    // Send message & fire callback when response comes back
    this.SendRequest = (args) => {

        functions.Map(entity,args);

        return new Promise(async (callback) =>{

            if( !this.Validated() )
            {
                this.HandleResponse(callback, {
                    "Result": "Error",
                    "ErrorMessage": [ (!functions.isEmpty(error)) ? error : "An error occurred while processing." ]
                });

                return;
            }

            let data = {
                AuthToken: entity.AuthToken,
                HTTPMethod: "PATCH"
            };

            url = `${url}/${entity.MessageID}`;
    
            functions.HttpRequest(url, data, (responseData) => this.HandleResponse(callback, responseData));
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