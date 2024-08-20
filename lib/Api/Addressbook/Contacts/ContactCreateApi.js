const functions = require("../../../Functions");
const helpers = require("./helpers");

const ContactApiRequestDTO = require("./dtos/ContactApiRequestDTO");

function ContactCreateApi(args)
{
    let url = `${args.URL}`;

    let entity = new ContactApiRequestDTO(args);

    let error = "";

    this.HandleResponse = async (callback, responseData) => {
        callback(helpers.MapApiResponse(responseData));
    };

    // Send message & fire callback when response comes back
    this.Run = async (args) => {

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

          let data = entity;

          data.HTTPMethod = "POST";

          functions.HttpRequest(url, data, (responseData) => this.HandleResponse(callback, responseData));
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