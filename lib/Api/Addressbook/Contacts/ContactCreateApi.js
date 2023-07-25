const functions = require("../../../Functions");

const ContactApiRequestDTO = require("./dtos/ContactApiRequestDTO");

function ContactCreateApi(args)
{
    let url = `${args.URL}`;

    let entity = new ContactApiRequestDTO(args);

    let error = "";

    // Send message & fire callback when response comes back
    this.Run = async (args) => {

      functions.Map(entity,args);

      return new Promise(async (callback) =>{

        if( this.Validated() )
        {
            let data = entity;

            data.HTTPMethod = "POST";

            functions.HttpRequest(url,data,callback);
        }
        else
        {
            callback({
                "Result": "Error",
                "ErrorMessage": [error]
            });
        }
      });
    }

    this.Validated = () => {
      
        if( functions.isEmpty(entity.AuthToken) )
        {
            error = "Missing AuthToken";
            return false;
        }
        if( !functions.isEmpty(entity.EmailAddress) && !functions.isEmail(entity.EmailAddress) )
        {
            error = "Invalid email address format for EmailAddress property";
            return false;
        }
        
        return true;
    };

    return this;
}

module.exports = ContactCreateApi;