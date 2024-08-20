const functions = require("../../Functions");
const helpers = require("./helpers");

const FaxModel = require('./models/FaxModel');
const FaxApiRequestDTO = require('./dtos/FaxApiRequestDTO');

function FaxApi(args)
{
    const url = `${args.URL}/fax`;

    let entity = new FaxModel(args);
    let Error = "";

    this.HandleResponse = async (callback, responseData) => 
    {
        callback(helpers.MapApiResponse(responseData));
    };

    // Send message & fire callback when response comes back
    this.SendMessage = async (args) => {

        functions.Map(entity,args);

        return new Promise(async (callback) =>{
            if( !functions.isEmpty(entity.Attachments) )
            {
                for(let i in entity.Attachments)
                {
                    let file = {
                        "Name": functions.FileHandler.getBaseName(entity.Attachments[i]),
                        "Data": await functions.FileHandler.getFileData(entity.Attachments[i])
                    }
    
                    entity.Files.push(file);
                }
            }

            if( !this.Validated() )
            {
                this.HandleResponse(callback, {
                    "Result": "Error",
                    "ErrorMessage": [ (!functions.isEmpty(error)) ? error : "An error occurred while processing." ]
                });

                return;
            }
    
            let data = {
                "AuthToken": entity.AuthToken,
                "MessageData": new FaxApiRequestDTO(entity)
            };
    
            functions.HttpRequest(url, data, (responseData) => this.HandleResponse(callback, responseData));    
        });
    }

    
    this.Validated = () => {

        if( functions.isEmpty(entity.AuthToken) )
        {
            Error = "Missing AuthToken";
            return false;
        }
        if( !functions.isEmpty(entity.WebhookCallbackURL) )
        {
            if( functions.isEmpty(entity.WebhookCallbackFormat) || (entity.WebhookCallbackFormat.toUpperCase() != "JSON" && entity.WebhookCallbackFormat.toUpperCase() != "XML") )
            {
                Error = "Missing or invalid WebhookCallbackFormat - JSON or XML";
                return false;
            }
        }
        if( !functions.isEmpty(entity.SendTime) && !functions.isDateTime(entity.SendTime) )
        {
            Error = "Unable to parse SendTime. Use YYYY-MM-DD hh:mm format."
            return false;
        }
        if( functions.isEmpty(entity.Message) && functions.isEmpty(entity.Files) && functions.isEmpty(entity.Attachments) )
        {
            Error = "Missing fax contents - Message and/or File Attachments required";
            return false;
        }
        if( !functions.isEmpty(entity.RetryAttempts) && !functions.isNumber(entity.RetryAttempts) )
        {
            Error = "RetryAttempts must be a number";
            return false;
        }
        if( !functions.isEmpty(entity.RetryPeriod) && !functions.isNumber(entity.RetryPeriod) )
        {
            Error = "RetryPeriod must be a number";
            return false;
        }
        if( functions.isEmpty(entity.Destinations) )
        {
            Error = "Empty Destination(s)";
            return false;
        }

        for(let i in entity.Destinations )
        {
            let destination = entity.Destinations[i];

            if( typeof destination == 'object' && !functions.isEmpty(destination.Group) )
            {
                entity.Destinations[i].GroupID = destination.Group.GroupID;

                delete destination.Group;
            }
            if( typeof destination == 'object' && !functions.isEmpty(destination.Contact) )
            {
                entity.Destinations[i].ContactID = destination.Contact.ContactID;

                delete destination.Contact;
            }

            if( !functions.isEmpty(destination.Recipient) &&
                !functions.isPhoneNumber(destination.Recipient) )
            {
                Error = "Invalid Recipient - must be phone number - "+destination.Recipient;
                return false;
            }
        }

        if( !functions.isEmpty(entity.Files) )
        {
            for(let i in entity.Files )
            {
                if( functions.isEmpty(entity.Files[i].Name) )
                {
                    Error = "Could not find attachment file name.";
                    return false;
                }
                if( functions.isEmpty(entity.Files[i].Data) )
                {
                    Error = "Could not parse attachment file data "+entity.Files[i].Name;
                    return false;
                }
            }
        }

        if( !functions.isEmpty(this.Mode) && this.Mode.toUpperCase() != "TEST" )
        {
            Error = "Only Mode=Test is allowed";
            return false;
        }

        return true;
    };

    this.AddRecipient = (recipient) => {

        let targets = helpers.AddRecipient(recipient);
        
        if( !functions.isEmpty(targets) )
        {
            for(let i in targets)
            {
                entity.Destinations.push(targets[i]);
            }
        }
    };

    this.AddAttachment = (attachment) => {

        if( functions.FileHandler.fileExists(attachment) )
        {
            entity.Attachments.push(attachment);
        }
    };
    
    return this;
}

module.exports = FaxApi;
