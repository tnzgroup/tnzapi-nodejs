const functions = require("../../../Functions");
const common = require("./common");

function TTS(args)
{
    const url = this.URL + "/tts";

    this.MessageID = "";
    this.Reference = "";
    this.WebhookCallbackURL = "";
    this.WebhookCallbackFormat = "JSON";
    this.SendTime = "";
    this.TimeZone = "New Zealand";
    this.SubAccount = "";
    this.Department = "";
    this.ChargeCode = "";
    this.ReportTo = "";
    this.RetryAttempts = 3;
    this.RetryPeriod = 1;
    this.MessageToPeople = "";
    this.MessageToAnswerphones = "";
    this.Keypads = [];
    this.CallRouteMessageToPeople = "";
    this.CallRouteMessageToOperators = "";
    this.CallRouteMessageOnWrongKey = "";
    this.NumberOfOperators = 5;
    this.Voice = "Female1";
    this.Options = "";
    this.Mode = "";
    this.Destinations = [];
    
    for(var name in args)
    {
        this[name] = args[name];
    }

    // Send message & fire callback when response comes back
    this.SendMessage = (callback) => {

        if( this.Validated() )
        {
            let data = {
                "AuthToken": this.AuthToken,
                "Sender": this.Sender,
                "APIKey": this.APIKey,
                "MessageData": {
                    "MessageID": this.MessageID,
                    "Reference": this.Reference,
                    "WebhookCallbackURL": this.WebhookCallbackURL,
                    "WebhookCallbackFormat": this.WebhookCallbackURL,
                    "SendTime": this.SendTime,
                    "TimeZone": this.TimeZone,
                    "SubAccount": this.SubAccount,
                    "Department": this.Department,
                    "ChargeCode": this.ChargeCode,
                    "ReportTo": this.ReportTo,
                    "RetryAttempts": this.RetryAttempts,
                    "RetryPeriod": this.RetryPeriod,
                    "MessageToPeople": this.MessageToPeople,
                    "MessageToAnswerphones": this.MessageToAnswerphones,
                    "Keypads": this.Keypads,
                    "CallRouteMessageToPeople": this.CallRouteMessageToPeople,
                    "CallRouteMessageToOperators": this.CallRouteMessageToOperators,
                    "CallRouteMessageOnWrongKey": this.CallRouteMessageOnWrongKey,
                    "NumberOfOperators": this.NumberOfOperators,
                    "Voice": this.Voice,
                    "Options": this.Options,
                    "Mode": this.Mode,
                    "Destinations" : this.Destinations
                }
            };
    
            functions.HttpRequest(url,data,callback);
        }
        else
        {
            callback({
                "Result": "Error",
                "ErrorMessage": this.Error
            });
        }
    }

    
    this.Validated = () => {

        if( functions.isEmpty(this.AuthToken) )
        {
            if( functions.isEmpty(this.Sender) )
            {
                this.Error = "Empty Sender";
                return false;
            }
            if( functions.isEmpty(this.APIKey) )
            {
                this.Error = "Empty APIKey";
                return false;
            }
        }
        if( !functions.isEmpty(this.WebhookCallbackURL) )
        {
            if( functions.isEmpty(this.WebhookCallbackFormat) || (this.WebhookCallbackFormat.toUpperCase() != "JSON" && this.WebhookCallbackFormat.toUpperCase() != "XML") )
            {
                this.Error = "Missing or invalid WebhookCallbackFormat - JSON or XML";
                return false;
            }
        }
        if( !functions.isEmpty(this.SendTime) && !functions.isDateTime(this.SendTime) )
        {
            this.Error = "Unable to parse SendTime. Use YYYY-MM-DD hh:mm format."
            return false;
        }
        if( functions.isEmpty(this.MessageToPeople) )
        {
            this.Error = "Missing MessageToPeople";
            return false;
        }
        if( !functions.isEmpty(this.RetryAttempts) && !functions.isNumber(this.RetryAttempts) )
        {
            this.Error = "RetryAttempts must be a number";
            return false;
        }
        if( !functions.isEmpty(this.RetryPeriod) && !functions.isNumber(this.RetryPeriod) )
        {
            this.Error = "RetryPeriod must be a number";
            return false;
        }
        if( !functions.isEmpty(this.NumberOfOperators) && !functions.isNumber(this.NumberOfOperators) )
        {
            this.Error = "NumberOfOperators must be a number";
            return false;
        }
        if( functions.isEmpty(this.Destinations) )
        {
            this.Error = "Empty Destination(s)";
            return false;
        }

        for(let i in this.Destinations )
        {
            if( !functions.isEmpty(this.Destinations[i].Recipient) )
            {
                if( functions.isEmail(this.Destinations[i].Recipient) )
                {
                    this.Error = "Invalid Recipient - must be mobile number - "+this.Destinations[i].Recipient;
                    return false;
                }
            }
        }

        if( !functions.isEmpty(this.Keypads) )
        {
            for(let i in this.Keypads)
            {
                if( functions.isEmpty(this.Keypads[i].RouteNumber) && functions.isEmpty(this.Keypads[i].Play) )
                {
                    this.Error = "Empty Keypad " + this.Keypads[i].Tone + " Data: Please specify RouteNumber OR Play";
                    return false;
                }
            }
        }

        if( !functions.isEmpty(this.Mode) && this.Mode.toUpperCase() != "TEST" )
        {
            this.Error = "Only Mode=Test is allowed";
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
                this.Destinations.push(targets[i]);
            }
        }
    };

    this.AddKeypad = (tone,routeNumber,play=undefined) => {
        this.Keypads.push({
            "Tone": tone,
            "RouteNumber": routeNumber,
            "Play": play
        });
    }
    
    return this;
}

module.exports = TTS;
