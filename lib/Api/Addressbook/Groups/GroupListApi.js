const functions = require("../../../Functions");
const helpers = require("./helpers");

const GroupListApiRequestDTO = require("./dtos/GroupListApiRequestDTO");

function GroupListApi(args)
{
    let url = `${args.URL}`;

    let entity = new GroupListApiRequestDTO(args);

    let error = "";

    this.HandleResponse = async (callback, responseData) => {
        callback(helpers.MapListApiResponse(responseData));
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

          url = `${url}/List?recordsPerPage=${entity.RecordsPerPage}&page=${entity.Page}`;

          functions.HttpRequest(url, data, (responseData) => this.HandleResponse(callback, responseData));
      });
    }

    this.Validated = () => {
      
        if( functions.isEmpty(entity.AuthToken) )
        {
            error = "Missing AuthToken";
            return false;
        }
        if( !functions.isNumber(entity.RecordsPerPage) )
        {
            error = "RecordPerPage must be a number";
            return false;
        }
        if( !functions.isNumber(entity.Page) )
        {
            error = "Page must be a number";
            return false;
        }
        
        return true;
    };

    return this;
}

module.exports = GroupListApi;