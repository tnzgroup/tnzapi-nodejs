const fs = require('fs');
const util = require('util');
const path = require('path');
const read = util.promisify(fs.readFile);

const FileHandler = {
    fileExists: (file) => {
        try 
        {
            if (fs.existsSync(file)) {
              return true;
            }
        }
        catch(err) 
        {
            console.error(err)
        }
    
        return false;
    },
    getFileData: async (file) => {
        return Buffer.from((await read(file))).toString("base64");
    },
    getBaseName: (file) => {
        return path.basename(file);
    }
}

module.exports = FileHandler;