const functions = require("../../Functions");

const SMSReceivedApiRequestDTO = require("./dtos/SMSReceivedApiRequestDTO");

const SMSReceivedDTO = require('./dtos/SMSReceivedDTO');
const SMSReceivedApiResponseDTO = require('./dtos/SMSReceivedApiResponseDTO');
const ErrorResponseDTO = require('../../Common/dtos/ErrorResponseDTO');

function SMSReceivedApi(args)
{
    let url = `${args.URL}/sms/received`;

    let entity = new SMSReceivedApiRequestDTO(args);

    let Error = "";

    this.HandleResponse = async (callback, responseData) => {

        if( !functions.isEmpty(responseData.Result) && responseData.Result.toUpperCase() == "SUCCESS" )
        {
            if( !functions.isEmpty(responseData.Messages) )
            {
                let messages = [];

                for(let i in responseData.Messages)
                {
                    messages.push(new SMSReceivedDTO(responseData.Messages[i]));
                }

                responseData.Messages = messages;
            }

            callback(new SMSReceivedApiResponseDTO(responseData));

            return;
        }

        callback(new ErrorResponseDTO(responseData));
    };

    // Send message & fire callback when response comes back
    this.Poll = (args) => {

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
    
            functions.HttpRequest(url, data, (responseData) => this.HandleResponse(callback, responseData));
            
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

module.exports = SMSReceivedApi;