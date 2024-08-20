const functions = require("../../../../Functions");

const ContactApiResponseDTO = require("../dtos/ContactApiResponseDTO");
const ErrorResponseDTO = require("../../../../Common/dtos/ErrorResponseDTO");

const ContactModel = require("../../Contacts/models/ContactModel");

const MapApiResponse = (responseData) => {

    if( !functions.isEmpty(responseData) )
    {
        if( responseData.Result.toUpperCase() == "SUCCESS" )
        {
            if( !functions.isEmpty(responseData.Contact) )
            {
                responseData.Contact = new ContactModel(responseData.Contact);
            }

            return new ContactApiResponseDTO(responseData);
        }
    }

    return new ErrorResponseDTO(responseData);
};

module.exports = MapApiResponse;