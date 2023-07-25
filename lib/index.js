/* Backward Compatibility */

const Send = require('./Legacy/PreV203/Send');
const Get = require('./Legacy/PreV203/Get');
const Set = require('./Legacy/PreV203/Set');

/* V2.03+ */

const Messaging = require('./Api/Messaging');
const Reports = require('./Api/Reports');
const Actions = require('./Api/Actions');
const Addressbook = require('./Api/Addressbook');

function TNZAPI(args)
{
    this.AuthToken = args.AuthToken;
    this.Sender = args.Sender;
    this.APIKey = args.APIKey;
    //this.URL = "http://localhost:8060/api/v2.03";
    this.URL = "https://api.tnz.co.nz/api/v2.03";

    /* Backward Compatibility */

    this.Send = new Send(this);
    this.Get = new Get(this);
    this.Set = new Set(this);

    /* V2.03+ */

    this.Messaging = new Messaging(this);
    this.Reports = new Reports(this);
    this.Actions = new Actions(this);
    this.Addressbook = new Addressbook(this);

    return this;
}

module.exports = TNZAPI;