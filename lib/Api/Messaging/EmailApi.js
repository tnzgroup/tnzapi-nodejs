const functions = require("../../Functions");
const common = require("./common");

const EmailModel = require('./models/EmailModel');
const EmailApiRequestDTO = require('./dtos/EmailApiRequestDTO');

function EmailApi(args)
{
    const url = `${args.URL}/email`;

    let entity = new EmailModel(args);

    let Error = "";

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

            if( this.Validated() )
            {
                let data = {
                    "AuthToken": entity.AuthToken,
                    "MessageData": new EmailApiRequestDTO(entity)
                };

                //console.log(data);

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
        if( functions.isEmpty(entity.EmailSubject) )
        {
            Error = "Missing EmailSubject";
            return false;
        }
        if( functions.isEmpty(entity.MessagePlain) && functions.isEmpty(entity.MessageHTML) )
        {
            Error = "Missing MessagePlain and MessageHTML";
            return false;
        }
        if( functions.isEmpty(entity.Destinations) )
        {
            Error = "Empty Destination(s)";
            return false;
        }

        for(let i in entity.Destinations )
        {
            if( !functions.isEmpty(entity.Destinations[i].Recipient) &&
                !functions.isEmail(entity.Destinations[i].Recipient) )
            {
                Error = "Invalid Recipient - must be email address - "+entity.Destinations[i].Recipient;
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

        if( !functions.isEmpty(entity.Mode) && entity.Mode.toUpperCase() != "TEST" )
        {
            Error = "Only Mode=Test is allowed";
            return false;
        }

        return true;
    };

    this.AddRecipient = (recipient) => {

        let targets = common.AddRecipient(recipient);
        
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

module.exports = EmailApi;