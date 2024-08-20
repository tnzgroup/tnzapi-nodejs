const functions = require("../../../../Functions");

const GroupApiResponseDTO = require("../dtos/GroupApiResponseDTO");
const ErrorResponseDTO = require("../../../../Common/dtos/ErrorResponseDTO");

const GroupModel = require("../models/GroupModel");

const MapApiResponse = (responseData) => {

    if( !functions.isEmpty(responseData) )
    {
        if( responseData.Result.toUpperCase() == "SUCCESS" )
        {
            if( !functions.isEmpty(responseData.Group) )
            {
                responseData.Group = new GroupModel(responseData.Group);
            }

            return new GroupApiResponseDTO(responseData);
        }
    }

    return new ErrorResponseDTO(responseData);
};

module.exports = MapApiResponse;