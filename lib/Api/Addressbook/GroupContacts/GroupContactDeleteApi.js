const functions = require("../../../Functions");

const GroupContactApiRequestDTO = require("./dtos/GroupContactApiRequestDTO");

function GroupContactDeleteApi(args)
{
    let url = `${args.URL}`;

    let entity = new GroupContactApiRequestDTO(args);

    let error = "";

    // Send message & fire callback when response comes back
    this.Run = async (args) => {

      functions.Map(entity,args);

      return new Promise(async (callback) =>{

          if( this.Validated() )
          {
              let data = {
                  AuthToken: entity.AuthToken,
                  HTTPMethod: "DELETE"
              };

              url = `${url}/${entity.GroupCode}/contact/${entity.ContactID}`;

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
        if( functions.isEmpty(entity.ContactID) )
        {
            error = "Missing ContactID";
            return false;
        }
        
        return true;
    };

    return this;
}

module.exports = GroupContactDeleteApi;