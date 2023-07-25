function replaceAll(str, find, replace) {  
    return str.split(find).join(replace);
}

const isEmpty = (obj) => {
  if( typeof obj == 'undefined' || obj == null || obj == false || obj == '' || obj.length <= 0 )
  {
      return true;
  }
  
  return false;
}

const isEmail = (str) => {

    let iChars = "~`!#$%^&()=[]\\;,/{}|\":<>?";
  
    for (let i = 0; i < str.length; i++) {
        if (iChars.indexOf(str.charAt(i)) != -1) {
            return false; //Found illegal special character
        }
    }
  
    str = str=str.split("<");
  
    if( str[1] )
    {
      str = str[1].split(">");
      str = str[0];
    }
  
    let supported = 0;
    if (RegExp) {
      let tempStr = "a";
      let tempReg = new RegExp(tempStr);
      if (tempReg.test(tempStr)) supported = 1;
    }
    if (!supported)
      return (str.indexOf(".") > 2) && (str.indexOf("@") > 0);

    let r1 = new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
    let r2 = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,10}|[0-9]{1,3})(\\]?)$"); 
     
    return (!r1.test(str) && r2.test(str));
}

const isNumber = (num) => {

    if( typeof num == "number" )
    {
        return true;
    }

    return false;
}

const isDateTime = (date) => {
    
    let testDate;

    try
    {
        testDate = new Date(Date.parse(date));
    }
    catch(Exception)
    {
        testDate = "Invalid Date";
        
        return false;
    }

    return (testDate != "Invalid Date") ? true : false;
}

const formatPhoneNumber = (requested_number) => {    

    requested_number = replaceAll(requested_number," ","");
    requested_number = replaceAll(requested_number,"-","");
    requested_number = replaceAll(requested_number,"_","");
    requested_number = replaceAll(requested_number,"(","");
    requested_number = replaceAll(requested_number,")","");
    requested_number = replaceAll(requested_number,"+","");
    requested_number = replaceAll(requested_number,"#","");
    
    if( requested_number.substring(0,2) == "00" )
    {
        requested_number = "64"+requested_number.substring(2);
    }
    if( requested_number.substring(0,2) == "04" )
    {
        requested_number = "614"+requested_number.substring(2);
    }
    if( requested_number.substring(0,1) == "0" )
    {
        requested_number = "64"+requested_number.substring(1);
    }
    
    return requested_number;
}

const httpBuildQuery = (data) => {
    return Object.keys(data).map((key) => {
         if (Array.isArray(data[key])) {
             //return encodeURIComponent(`${key}=${data[key].map((item) => item).join('%2C')}`);
             return `${encodeURIComponent(key)}=${encodeURIComponent(data[key].map((item) => item).join('%2C'))}`;
         }
         //return encodeURIComponent(`${key}=${data[key]}`);
         return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
     }).join('&');
 }

 /*
 const httpBuildQuery = (data) => {
    return Object.keys(data).map((key) => {
         if (Array.isArray(data[key])) {
             //return encodeURIComponent(`${key}=${data[key].map((item) => item).join('%2C')}`);
             return `${key}=${data[key].map((item) => item).join('%2C')}`;
         }
         //return encodeURIComponent(`${key}=${data[key]}`);
         return `${key}=${data[key]}`;
     }).join('&');
 }
 */

module.exports.isEmpty = isEmpty;
module.exports.isEmail = isEmail;
module.exports.isNumber = isNumber;
module.exports.isDateTime = isDateTime;
module.exports.formatPhoneNumber = formatPhoneNumber;
module.exports.httpBuildQuery = httpBuildQuery;