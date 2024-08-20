const functions = require("../../../../Functions");

const GroupListApiResponseDTO = require("../dtos/GroupListApiResponseDTO");
const ErrorResponseDTO = require("../../../../Common/dtos/ErrorResponseDTO");

const GroupModel = require("../models/GroupModel");

const MapListApiResponse = (responseData) => {

    if( !functions.isEmpty(responseData) )
    {
        if( responseData.Result.toUpperCase() == "SUCCESS" )
        {
            if( !functions.isEmpty(responseData.Groups) )
            {
                let groups = [];
        
                for(let group in responseData.Groups)
                {
                    groups.push(new GroupModel(responseData.Groups[group]));
                }
        
                responseData.Groups = groups;
            }

            return new GroupListApiResponseDTO(responseData);
        }
    }

    return new ErrorResponseDTO(responseData);
};

module.exports = MapListApiResponse;