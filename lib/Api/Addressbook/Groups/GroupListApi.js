const functions = require("../../../Functions");

const GroupListApiRequestDTO = require("./dtos/GroupListApiRequestDTO");

function GroupListApi(args)
{
    let url = `${args.URL}`;

    let entity = new GroupListApiRequestDTO(args);

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

            url = `${url}/List?recordsPerPage=${entity.RecordsPerPage}&page=${entity.Page}`;

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