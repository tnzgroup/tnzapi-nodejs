const functions = require("../../../Functions");
const common = require("./common");

function Fax(args)
{
    const url = this.URL + "/fax";

    let Error = "";
    let Attachments = [];

    this.MessageID = "";
    this.Reference = "";
    this.WebhookCallbackURL = "";
    this.WebhookCallbackFormat = "JSON";
    this.SendTime = "";
    this.TimeZone = "New Zealand";
    this.SubAccount = "";
    this.Department = "";
    this.ChargeCode = "";
    this.Resolution = "high";
    this.CSID = "";
    this.RetryAttempts = 3;
    this.RetryPeriod = 1;
    this.Message = "";
    this.Mode = "";
    this.Destinations = [];
    this.Files = [];

    for(var name in args)
    {
        this[name] = args[name];
    }

    // Send message & fire callback when response comes back
    this.SendMessage = async (callback) => {

        if( !functions.isEmpty(Attachments) )
        {
            for(let i in Attachments)
            {
                let file = {
                    "Name": functions.FileHandler.getBaseName(Attachments[i]),
                    "Data": await functions.FileHandler.getFileData(Attachments[i])
                }

                this.Files.push(file);
            }
        }

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
                    "WebhookCallbackFormat": this.WebhookCallbackFormat,
                    "SendTime": this.SendTime,
                    "TimeZone": this.TimeZone,
                    "SubAccount": this.SubAccount,
                    "Department": this.Department,
                    "ChargeCode": this.ChargeCode,
                    "Resolution": this.Resolution,
                    "CSID": this.CSID,
                    "RetryAttempts": this.RetryAttempts,
                    "RetryPeriod": this.RetryPeriod,
                    "Message": this.Message,
                    "Mode": this.Mode,
                    "Destinations" : this.Destinations,
                    "Files": this.Files
                }
            };
    
            functions.HttpRequest(url,data,callback);
        }
        else
        {
            callback({
                "Result": "Error",
                "ErrorMessage": Error
            });
        }
    }

    
    this.Validated = () => {

        if( functions.isEmpty(this.AuthToken) )
        {
            if( functions.isEmpty(this.Sender) )
            {
                Error = "Empty Sender";
                return false;
            }
            if( functions.isEmpty(this.APIKey) )
            {
                Error = "Empty APIKey";
                return false;
            }
        }
        if( !functions.isEmpty(this.WebhookCallbackURL) )
        {
            if( functions.isEmpty(this.WebhookCallbackFormat) || (this.WebhookCallbackFormat.toUpperCase() != "JSON" && this.WebhookCallbackFormat.toUpperCase() != "XML") )
            {
                Error = "Missing or invalid WebhookCallbackFormat - JSON or XML";
                return false;
            }
        }
        if( !functions.isEmpty(this.SendTime) && !functions.isDateTime(this.SendTime) )
        {
            Error = "Unable to parse SendTime. Use YYYY-MM-DD hh:mm format."
            return false;
        }
        if( functions.isEmpty(this.Message) && functions.isEmpty(this.Files) && functions.isEmpty(Attachments) )
        {
            Error = "Missing fax contents - Message and/or File Attachments required";
            return false;
        }
        if( !functions.isEmpty(this.RetryAttempts) && !functions.isNumber(this.RetryAttempts) )
        {
            Error = "RetryAttempts must be a number";
            return false;
        }
        if( !functions.isEmpty(this.RetryPeriod) && !functions.isNumber(this.RetryPeriod) )
        {
            Error = "RetryPeriod must be a number";
            return false;
        }
        if( functions.isEmpty(this.Destinations) )
        {
            Error = "Empty Destination(s)";
            return false;
        }

        for(let i in this.Destinations )
        {
            if( !functions.isEmpty(this.Destinations[i].Recipient) )
            {
                if( functions.isEmail(this.Destinations[i].Recipient) )
                {
                    Error = "Invalid Recipient - must be mobile number - "+this.Destinations[i].Recipient;
                    return false;
                }
            }
        }

        if( !functions.isEmpty(this.Files) )
        {
            for(let i in this.Files )
            {
                if( functions.isEmpty(this.Files[i].Name) )
                {
                    Error = "Could not find attachment file name.";
                    return false;
                }
                if( functions.isEmpty(this.Files[i].Data) )
                {
                    Error = "Could not parse attachment file data "+this.Files[i].Name;
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

        let targets = common.AddRecipient(recipient);
        
        if( !functions.isEmpty(targets) )
        {
            for(let i in targets)
            {
                this.Destinations.push(targets[i]);
            }
        }
    };

    this.AddAttachment = (attachment) => {

        if( functions.FileHandler.fileExists(attachment) )
        {
            Attachments.push(attachment);
        }
    };
    
    return this;
}

module.exports = Fax;
