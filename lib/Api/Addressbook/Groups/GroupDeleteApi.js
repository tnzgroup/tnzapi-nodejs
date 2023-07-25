const functions = require("../../../Functions");

const GroupApiRequestDTO = require("./dtos/GroupApiRequestDTO");

function GroupDeleteApi(args)
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
            let data = {
                AuthToken: entity.AuthToken,
                HTTPMethod: "DELETE"
            };

            url = `${url}/${entity.GroupCode}`;

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
        
        return true;
    };

    return this;
}

module.exports = GroupDeleteApi;