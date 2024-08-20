const functions = require("../../../../Functions");

const ContactGroupListApiResponseDTO = require("../dtos/ContactGroupListApiResponseDTO");
const ErrorResponseDTO = require("../../../../Common/dtos/ErrorResponseDTO");

const ContactModel = require("../../Contacts/models/ContactModel");
const GroupModel = require("../../Groups/models/GroupModel");

const MapListApiResponse = (responseData) => {

    if( !functions.isEmpty(responseData) )
    {
        if( responseData.Result.toUpperCase() == "SUCCESS" )
        {
            if( !functions.isEmpty(responseData.Contact) )
            {
                responseData.Contact = new ContactModel(responseData.Contact);
            }
    
            if( !functions.isEmpty(responseData.Groups) )
            {
                let groups = [];
        
                for(let group in responseData.Groups)
                {
                    groups.push(new GroupModel(responseData.Groups[group]));
                }
        
                responseData.Groups = groups;
            }

            return new ContactGroupListApiResponseDTO(responseData);
        }
    }

    return new ErrorResponseDTO(responseData);
};

module.exports = MapListApiResponse;