const functions = require("../../../Functions");
const ActionApiResponseDTO = require("../dtos/ActionApiResponseDTO");
const ErrorResponseDTO = require("../../../Common/dtos/ErrorResponseDTO");

const MapApiResponse = (responseData) => {

    if( !functions.isEmpty(responseData) )
    {
        if( responseData.Result == "Success" )
        {
            return new ActionApiResponseDTO(responseData);
        }
    }

    return new ErrorResponseDTO(responseData);
};

module.exports = MapApiResponse;