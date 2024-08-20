const functions = require("../../Functions");
const helpers = require("./helpers");

const ResubmitApiRequestDTO = require('./dtos/ResubmitApiRequestDTO');

function ResubmitApi(args)
{
    let url = `${args.URL}/resubmit`;

    let entity = new ResubmitApiRequestDTO(args);

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
                SendTime: entity.SendTime,
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
        if( !functions.isEmpty(entity.SendTime) && !functions.isDateTime(entity.SendTime) )
        {
            error = "Unable to parse SendTime. Use YYYY-MM-DD hh:mm format."
            return false;
        }

        return true;
    };

    return this;
}

module.exports = ResubmitApi;