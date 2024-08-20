const functions = require("../../../Functions");
const helpers = require("./helpers");

const GroupApiRequestDTO = require("./dtos/GroupApiRequestDTO");

function GroupDetailApi(args)
{
    let url = `${args.URL}`;

    let entity = new GroupApiRequestDTO(args);

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

          let data = {
              AuthToken: entity.AuthToken,
              HTTPMethod: "GET"
          };

          url = `${url}/${entity.GroupID ?? entity.GroupCode}`;

          functions.HttpRequest(url, data, (responseData) => this.HandleResponse(callback, responseData));
      });
    }

    this.Validated = () => {
      
        if( functions.isEmpty(entity.AuthToken) )
        {
            error = "Missing AuthToken";
            return false;
        }
        if( functions.isEmpty(entity.GroupID) && functions.isEmpty(entity.GroupCode) )
        {
            error = "Missing GroupID";
            return false;
        }
        
        return true;
    };

    return this;
}

module.exports = GroupDetailApi;
