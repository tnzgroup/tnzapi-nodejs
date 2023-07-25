const functions = require("../../../Functions");

const ContactGroupApiRequestDTO = require("./dtos/ContactGroupApiRequestDTO");

function ContactGroupDetailApi(args)
{
    let url = `${args.URL}`;

    let entity = new ContactGroupApiRequestDTO(args);

    let error = "";

    // Send message & fire callback when response comes back
    this.Run = async (args) => {

      functions.Map(entity,args);

      return new Promise(async (callback) =>{

          if( this.Validated() )
          {
              let data = {
                  AuthToken: entity.AuthToken,
                  HTTPMethod: "GET"
              };

              url = `${url}/${entity.ContactID}/Group/${entity.GroupCode}`;

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
        if( functions.isEmpty(entity.ContactID) )
        {
            error = "Missing ContactID";
            return false;
        }
        if( functions.isEmpty(entity.GroupCode) )
        {
            error = "Missing GroupCode";
            return false;
        }
        
        return true;
    };

    return this;
}

module.exports = ContactGroupDetailApi;