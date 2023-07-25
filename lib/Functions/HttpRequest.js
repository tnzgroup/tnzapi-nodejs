const https = require('https');
const http = require('http');
const {isEmpty,isEmail,isNumber,isDateTime} = require("./UsefulStuff");

//  Function GetHostDetails:
//  Decide port/host/path/protocol based on url
const GetHostDetails = (url) => {

    let data = {
        "Port": 80,
        "Host": "",
        "Path": "",
        "Protocol": "http"
    };

    let protocols = {
        "https": {
            "prefix": "https://",
            "port": 443
        },
        "http": {
            "prefix": "http://",
            "port": 80
        }
    };

    for(let protocol in protocols)
    {
        let prefix = protocols[protocol].prefix;
        let port = protocols[protocol].port;
        
        if( url.substring(0,prefix.length).toLowerCase() === prefix)
        {
            let working_url = url.substring(prefix.length);
            let url_parts = working_url.split("/");

            if( url_parts[0].indexOf(":") >= 0 )
            {
                let host_parts = url_parts[0].split(":");

                data.Port = host_parts[1];
                data.Host = host_parts[0];
            }
            else
            {
                data.Port = port;
                data.Host = url_parts[0];
            }

            data.Path = working_url.substring(url_parts[0].length);
            data.Protocol = protocol;

            return data;
        }
    }
    
    return;
};

const RequestHttp = (options,callback) => {

    return http.request(options, res => {
        //console.log(`statusCode: ${res.statusCode}`);
        
        res.setEncoding('utf8');
        res.on('data', d => {
            //process.stdout.write(d);
            callback(JSON.parse(d));
        })
    });
}

const RequestHttps = (options,callback) => {
    return https.request(options, res => {
        //console.log(`statusCode: ${res.statusCode}`);

        res.setEncoding('utf8');
        res.on('data', d => {
            //process.stdout.write(d);
            callback(JSON.parse(d));
        })
    });
}

const HttpRequest = (url,data,callback) => {

    let host = GetHostDetails(url);

    let authToken = (!isEmpty(data.AuthToken)) ? data.AuthToken : "";

    let httpMethod = (!isEmpty(data.HTTPMethod)) ? data.HTTPMethod : "POST";

    // Just print out response when callback is not defined
    if( typeof callback == 'undefined' )
    {
        callback = (data) => {
            process.stdout.write(data);
        };
    }

    if( !isEmpty(authToken) )
    {
        delete data.Sender;
        delete data.APIKey;
    }

    delete data.AuthToken;

    data = JSON.stringify(data);

    // setting request options
    const options = {
        hostname: host.Host,
        port: host.Port,
        path: host.Path,
        method: httpMethod,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "encoding": "utf-8",
            'Authorization': ( !isEmpty(authToken) ) ? "Basic " + authToken : "",
            'User-Agent': "tnzapi-nodejs",
            'Content-Length': data.length
        }
    }
    
    // use http or https request depends on http:// or https:// on url
    const req = (host.Protocol == "https") ? RequestHttps(options,callback) : RequestHttp(options,callback);
    
    req.on('error', error => {
        console.error(error);
    });
    
    req.write(data);

    req.end();
}

module.exports = HttpRequest;