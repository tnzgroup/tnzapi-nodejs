const functions = require("../../../../Functions");

const ContactGroupApiResponseDTO = require("../dtos/ContactGroupApiResponseDTO");
const ErrorResponseDTO = require("../../../../Common/dtos/ErrorResponseDTO");

const ContactModel = require("../../Contacts/models/ContactModel");
const GroupModel = require("../../Groups/models/GroupModel");

const MapApiResponse = (responseData) => {

    if( !functions.isEmpty(responseData) )
    {
        if( responseData.Result.toUpperCase() == "SUCCESS" )
        {
            if( !functions.isEmpty(responseData.Contact) )
            {
                responseData.Contact = new ContactModel(responseData.Contact);
            }
    
            if( !functions.isEmpty(responseData.Group) )
            {
                responseData.Group = new GroupModel(responseData.Group);
            }

            return new ContactGroupApiResponseDTO(responseData);
        }
    }

    return new ErrorResponseDTO(responseData);
};

module.exports = MapApiResponse;