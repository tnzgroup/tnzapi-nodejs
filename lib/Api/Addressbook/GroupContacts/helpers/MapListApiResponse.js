const functions = require("../../../../Functions");

const GroupContactListApiResponseDTO = require("../dtos/GroupContactListApiResponseDTO");
const ErrorResponseDTO = require("../../../../Common/dtos/ErrorResponseDTO");

const ContactModel = require("../../Contacts/models/ContactModel");
const GroupModel = require("../../Groups/models/GroupModel");

const MapListApiResponse = (responseData) => {

    if( !functions.isEmpty(responseData) )
    {
        if( responseData.Result.toUpperCase() == "SUCCESS" )
        {
            if( !functions.isEmpty(responseData.Group) )
            {
                responseData.Group = new GroupModel(responseData.Group);
            }
    
            if( !functions.isEmpty(responseData.Contacts) )
            {
                let contacts = [];
        
                for(let contact in responseData.Contacts)
                {
                    contacts.push(new ContactModel(responseData.Contacts[contact]));
                }
        
                responseData.Contacts = contacts;
            }

            return new GroupContactListApiResponseDTO(responseData);
        }
    }

    return new ErrorResponseDTO(responseData);
};

module.exports = MapListApiResponse;