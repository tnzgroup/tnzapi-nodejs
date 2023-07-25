const functions = require("../../../Functions");

const GroupApiRequestDTO = require("./dtos/GroupApiRequestDTO");

function ContactUpdateApi(args)
{
    let url = `${args.URL}`;

    let entity = new GroupApiRequestDTO(args);

    let error = "";

    // Send message & fire callback when response comes back
    this.Run = async (args) => {

      functions.Map(entity,args);

      return new Promise(async (callback) =>{

        if( this.Validated() )
        {
            let data = entity;

            data.HTTPMethod = "PATCH";

            url = `${url}/${entity.GroupCode}`;

            delete data.GroupCode;

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
        if( functions.isEmpty(entity.GroupCode) )
        {
            error = "Missing GroupCode";
            return false;
        }
        if( !functions.isEmpty(entity.ViewEditBy) )
        {
            switch(entity.ViewEditBy.toUpperCase()) {
              case "ACCOUNT":
              case "SUBACCOUNT":
              case "DEPARTMENT":
              case "No":
                  break;
              default:
                  error = "Invalid ViewEditBy option - must be Account/Subaccount/Department/No";
                  return false;
            }
        }
        
        return true;
    };

    return this;
}

module.exports = ContactUpdateApi;