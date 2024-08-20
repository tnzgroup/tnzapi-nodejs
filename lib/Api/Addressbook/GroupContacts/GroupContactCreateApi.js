const functions = require("../../../Functions");
const helpers = require("./helpers");

const GroupContactApiRequestDTO = require("./dtos/GroupContactApiRequestDTO");

function GroupContactCreateApi(args)
{
    let url = `${args.URL}`;

    let entity = new GroupContactApiRequestDTO(args);

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

          url = `${url}/${entity.GroupID}/contact`;

          functions.HttpRequest(url, data, (responseData) => this.HandleResponse(callback, responseData));
      });
    }

    this.Validated = () => {

        if( !functions.isEmpty(entity.Group) )
        {
            entity.GroupID = entity.Group.GroupID;

            delete entity.Group;
        }
        if( !functions.isEmpty(entity.Contact) )
        {
            entity.ContactID = entity.Contact.ContactID;

            delete entity.Contact;
        }
      
        if( functions.isEmpty(entity.AuthToken) )
        {
            error = "Missing AuthToken";
            return false;
        }
        if( functions.isEmpty(entity.GroupID) )
        {
            error = "Missing GroupID";
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

module.exports = GroupContactCreateApi;