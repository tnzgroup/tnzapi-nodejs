let targets;

const AddRecipient = (recipient) => {

    targets = [];

    if( typeof recipient === "string" )
    {
        targets.push({"Recipient": recipient});
    }
    if( typeof recipient === "object" )
    {
        if( Array.isArray(recipient) )
        {
            for(let i=0; i<recipient.length; i++)
            {
                AddRecipient(recipient[i]);
            }
        }
        else
        {
            if( typeof recipient.Recipient !== 'undefined' )
            {
                targets.push(recipient);
            }
            else
            {
                throw "Invalid recipient format";
            }
        }
    }

    return targets;
};

module.exports = AddRecipient;