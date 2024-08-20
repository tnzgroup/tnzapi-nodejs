const functions = require("../../../../Functions");

const ContactListApiResponseDTO = require("../dtos/ContactListApiResponseDTO");
const ErrorResponseDTO = require("../../../../Common/dtos/ErrorResponseDTO");

const ContactModel = require("../../Contacts/models/ContactModel");

const MapListApiResponse = (responseData) => {

    if( !functions.isEmpty(responseData) )
    {
        if( responseData.Result.toUpperCase() == "SUCCESS" )
        {    
            if( !functions.isEmpty(responseData.Contacts) )
            {
                let contacts = [];
        
                for(let contact in responseData.Contacts)
                {
                    contacts.push(new ContactModel(responseData.Contacts[contact]));
                }
        
                responseData.Contacts = contacts;
            }

            return new ContactListApiResponseDTO(responseData);
        }
    }

    return new ErrorResponseDTO(responseData);
};

module.exports = MapListApiResponse;