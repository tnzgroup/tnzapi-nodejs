const functions = require("../../Functions");
const common = require("./common");

const VoiceModel = require('./models/VoiceModel');
const VoiceApiRequestDTO = require('./dtos/VoiceApiRequestDTO');

function VoiceApi(args)
{
    const url = `${args.URL}/voice`;

    let entity = new VoiceModel(args);

    let Error = "";

    // Send message & fire callback when response comes back
    this.SendMessage = async (args) => {

        functions.Map(entity,args);

        return new Promise(async (callback) =>{

            if( !functions.isEmpty(entity.VoiceFiles) )
            {
                for(let i in entity.VoiceFiles)
                {
                    entity[entity.VoiceFiles[i].Name] = await functions.FileHandler.getFileData(entity.VoiceFiles[i].File);
                }
            }
    
            if( !functions.isEmpty(entity.Keypads) )
            {
                for(let i in entity.Keypads)
                {
                    if( !functions.isEmpty(entity.Keypads[i].File) )
                    {
                        entity.Keypads[i].PlayFile = await functions.FileHandler.getFileData(entity.Keypads[i].File);
                    }
                }
            }
    
            if( this.Validated() )
            {
                let data = {
                    "AuthToken": entity.AuthToken,
                    "MessageData": new VoiceApiRequestDTO(entity)
                };
        
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
    }

    
    this.Validated = () => {

        if( functions.isEmpty(entity.AuthToken) )
        {
            Error = "Missing Auth Token";
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
            Error = "Missing MessageToPeople contents";
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
            if( !functions.isEmpty(entity.Destinations[i].Recipient) )
            {
                if( functions.isEmail(entity.Destinations[i].Recipient) )
                {
                    Error = "Invalid Recipient - must be phone number - "+entity.Destinations[i].Recipient;
                    return false;
                }
            }
        }

        if( !functions.isEmpty(entity.Keypads) )
        {
            for(let i in entity.Keypads)
            {
                if( functions.isEmpty(entity.Keypads[i].RouteNumber) && functions.isEmpty(entity.Keypads[i].Play) )
                {
                    Error = "Empty Keypad " + entity.Keypads[i].Tone + " Data: Please specify RouteNumber OR Play";
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

    this.AddVoiceFile = (field, file) => {
        if( functions.FileHandler.fileExists(file) )
        {
            entity.VoiceFiles.push({
               "Name": field,
               "File": file 
            });
        }
    }

    this.AddKeypad = (tone,routeNumber,play_file=undefined) => {
        entity.Keypads.push({
            "Tone": tone,
            "RouteNumber": routeNumber,
            "File": play_file
        });
    }
    
    return this;
}

module.exports = VoiceApi;
