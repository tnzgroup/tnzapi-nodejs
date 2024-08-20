const functions = require("../../Functions");

const SMSReplyApiRequestDTO = require("./dtos/SMSReplyApiRequestDTO");

const SMSReplyRecipientDTO = require('./dtos/SMSReplyRecipientDTO');
const SMSReplyRecipientSMSReplyDTO = require('./dtos/SMSReplyRecipientSMSReplyDTO');
const SMSReplyApiResponseDTO = require('./dtos/SMSReplyApiResponseDTO');
const ErrorResponseDTO = require('../../Common/dtos/ErrorResponseDTO');

function SMSReplyApi(args)
{
    let url = `${args.URL}/sms/reply`;

    let entity = new SMSReplyApiRequestDTO(args);

    let Error = "";

    this.HandleResponse = async (callback, responseData) => {
      
        if( !functions.isEmpty(responseData.Result) && responseData.Result.toUpperCase() == "SUCCESS" )
        {
            if( !functions.isEmpty(responseData.Recipients) )
            {
                let recipients = [];

                for(let i in responseData.Recipients)
                {
                    let recipient = new SMSReplyRecipientDTO(responseData.Recipients[i]);

                    if( !functions.isEmpty(recipient.SMSReplies) )
                    {
                        let messages = [];

                        for(let j in recipient.SMSReplies)
                        {
                            messages.push(new SMSReplyRecipientSMSReplyDTO(recipient.SMSReplies[j]));
                        }

                        recipient.SMSReplies = messages;
                    }

                    recipients.push(recipient);
                }

                responseData.Recipients = recipients;
            }

            callback(new SMSReplyApiResponseDTO(responseData));

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

            url = `${url}/${entity.MessageID}/?recordsPerPage=${entity.RecordsPerPage}&page=${entity.Page}`;
    
            functions.HttpRequest(url, data, (responseData) => this.HandleResponse(callback, responseData)); 
        });
    };

    this.Validated = () => {

        if( functions.isEmpty(entity.AuthToken) )
        {
            Error = "Missing AuthToken";
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

module.exports = SMSReplyApi;