const functions = require("../../Functions");
const helpers = require("./helpers");

const PacingApiRequestDTO = require('./dtos/PacingApiRequestDTO');

function PacingApi(args)
{
    let url = `${args.URL}/pacing`;

    let entity = new PacingApiRequestDTO(args);

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
                NumberOfOperators: entity.NumberOfOperators,
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