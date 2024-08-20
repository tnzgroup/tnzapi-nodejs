const functions = require("../../Functions");
const helpers = require("./helpers");

const SMSModel = require('./models/SMSModel');
const SMSApiRequestDTO = require('./dtos/SMSApiRequestDTO');

function SMSApi(args)
{
    const url = `${args.URL}/sms`;

    let entity = new SMSModel(args);

    let error = "";

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
              "MessageData": new SMSApiRequestDTO(entity)
          };
  
          functions.HttpRequest(url, data, (responseData) => this.HandleResponse(callback, responseData));    
        });
    }
    
    this.Validated = () => {
        
        if( functions.isEmpty(entity.AuthToken) )
        {
            error = "Missing AuthToken";
            return false;
        }
        if( !functions.isEmpty(entity.WebhookCallbackURL) )
        {
            if( functions.isEmpty(entity.WebhookCallbackFormat) || (entity.WebhookCallbackFormat.toUpperCase() != "JSON" && entity.WebhookCallbackFormat.toUpperCase() != "XML") )
            {
                error = "Missing or invalid WebhookCallbackFormat - JSON or XML";
                return false;
            }
        }
        if( !functions.isEmpty(entity.SendTime) && !functions.isDateTime(entity.SendTime) )
        {
            error = "Unable to parse SendTime. Use YYYY-MM-DD hh:mm format."
            return false;
        }
        if( functions.isEmpty(entity.MessageText) && functions.isEmpty(entity.Message) )
        {
            error = "Missing Message";
            return false;
        }
        if( functions.isEmpty(entity.Destinations) )
        {
            error = "Empty Destination(s)";
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
                !functions.isMobileNumber(destination.Recipient) )
            {
                Error = "Invalid Recipient - must be mobile number - "+destination.Recipient;
                return false;
            }
        }

        if( !functions.isEmpty(entity.Files) )
        {
            for(let i in entity.Files )
            {
                if( functions.isEmpty(entity.Files[i].Name) )
                {
                    error = "Could not find attachment file name.";
                    return false;
                }
                if( functions.isEmpty(entity.Files[i].Data) )
                {
                    error = "Could not parse attachment file data "+entity.Files[i].Name;
                    return false;
                }
            }
        }

        if( !functions.isEmpty(entity.Mode) && entity.Mode.toUpperCase() != "TEST" )
        {
            error = "Only Mode=Test is allowed";
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

module.exports = SMSApi;
