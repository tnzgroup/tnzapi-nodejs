const functions = require("../../Functions");
const helpers = require("./helpers");

const TTSModel = require('./models/TTSModel');
const TTSApiRequestDTO = require('./dtos/TTSApiRequestDTO');

function TTSApi(args)
{
    const url = `${args.URL}/tts`;

    let entity = new TTSModel(args);

    let Error = "";

    this.HandleResponse = async (callback, responseData) => 
    {
        callback(helpers.MapApiResponse(responseData));
    };

    // Send message & fire callback when response comes back
    this.SendMessage = (args) => {

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
                MessageData: new TTSApiRequestDTO(entity)
            };
    
            functions.HttpRequest(url, data, (responseData) => this.HandleResponse(callback, responseData));
        },this);
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
        if( functions.isEmpty(entity.MessageToPeople) )
        {
            Error = "Missing MessageToPeople";
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
        if( !functions.isEmpty(entity.NumberOfOperators) && !functions.isNumber(entity.NumberOfOperators) )
        {
            Error = "NumberOfOperators must be a number";
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

        if( !functions.isEmpty(entity.Keypads) )
        {
            for(let i in entity.Keypads)
            {
                if( functions.isEmpty(entity.Keypads[i].RouteNumber) && functions.isEmpty(entity.Keypads[i].Play) && functions.isEmpty(entity.Keypads[i].PlaySection) )
                {
                    Error = "Empty Keypad " + entity.Keypads[i].Tone + " Data: Please specify RouteNumber OR Play OR PlaySection";
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

        let targets = helpers.AddRecipient(recipient);
        
        if( !functions.isEmpty(targets) )
        {
            for(let i in targets)
            {
                entity.Destinations.push(targets[i]);
            }
        }
    };

    this.AddKeypad = (tone,routeNumber,play=undefined) => {
        entity.Keypads.push({
            "Tone": tone,
            "RouteNumber": routeNumber,
            "Play": play
        });
    }
    
    return this;
}

module.exports = TTSApi;