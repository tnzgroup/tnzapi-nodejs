const functions = require("../../Functions");

const StatusApiRequestDTO = require('./dtos/StatusApiRequestDTO');

const RecipientDTO = require('./dtos/RecipientDTO');
const StatusApiResponseDTO = require('./dtos/StatusApiResponseDTO');
const ErrorResponseDTO = require('../../Common/dtos/ErrorResponseDTO');

function StatusApi(args)
{
    let url = `${args.URL}/status`;

    let entity = new StatusApiRequestDTO(args);

    let Error = "";

    this.HandleResponse = async (callback, responseData) => {

        if( !functions.isEmpty(responseData.Result) && responseData.Result.toUpperCase() == "SUCCESS" )
        {
            if( !functions.isEmpty(responseData.Recipients) )
            {
                let recipients = [];

                for(let i in responseData.Recipients)
                {
                    recipients.push(new RecipientDTO(responseData.Recipients[i]));
                }

                responseData.Recipients = recipients;
            }

            callback(new StatusApiResponseDTO(responseData));

            return;
        }

        callback(new ErrorResponseDTO(responseData));
    };

    // Send message & fire callback when response comes back
    this.Poll = async (args) => {

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
                HTTPMethod: "GET"
            };

            url = `${url}/${entity.MessageID}/?recordsPerPage=${entity.RecordsPerPage}&page=${entity.Page}`;
      
            functions.HttpRequest(url, data, (responseData) => this.HandleResponse(callback, responseData)); 
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
        if( entity.RecordsPerPage < 1 || entity.RecordsPerPage > 999 )
        {
            Error = "RecordsPerPage must be between 1 and 999";
            return false;
        }
        if( !functions.isNumber(entity.Page) )
        {
            Error = "Page must be a number";
            return false;
        }
        if( entity.Page < 1 )
        {
            Error = "Page must be greater then 1";
            return false;
        }

        return true;
    };

    return this;
}

module.exports = StatusApi;