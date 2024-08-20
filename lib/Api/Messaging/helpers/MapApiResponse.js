const functions = require("../../../Functions");
const MessagingApiSuccessResponseDTO = require("../dtos/MessagingApiSuccessResponseDTO");
const ErrorResponseDTO = require("../../../Common/dtos/ErrorResponseDTO");

const MapApiResponse = (responseData) => {

    if( !functions.isEmpty(responseData) )
    {
        if( responseData.Result == "Success" )
        {
            return new MessagingApiSuccessResponseDTO(responseData);
        }
    }

    return new ErrorResponseDTO(responseData);
};

module.exports = MapApiResponse;