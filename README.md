# tnzapi

## Documentation

The documentation for the TNZ API can be found [here][apidocs].

## Versions

`tnzapi` uses a modified version of [Semantic Versioning](https://semver.org) for all changes. [See this document](VERSIONS.md) for details.

### Supported NodeJS Versions

This library supports the following NodeJS implementations:

* NodeJS v14

## Installation

Install from npm using [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), a
package manager for NodeJS.

    npm i tnzapi

You may need to run the above commands with `sudo`.

## Getting Started

Getting started with the TNZ API couldn't be easier. Create a
`Client` and you're ready to go.

### API Credentials

The `TNZAPI` needs your TNZ API credentials. You can either pass these
directly to the constructor (see the code below) or via environment variables.

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    "AuthToken": "[Your Auth Token]"
});
...
```

### Send Message

Send SMS/Email/Voice/Fax through `tnzapi` library.

#### Send SMS:

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    "AuthToken": "[Your Auth Token]"
});

var callback = function(data) {
    console.log("Response: ",JSON.stringify(data, null, "  "));
};

client.Messaging.SMS.SendMessage({
    Reference: "Test",                  // Optional
    Message: "Test SMS",                // SMS Message
    Destinations: [                     // SMS Recipients
      { Recipient: "+64211111111" },
      { Recipient: "+64222222222" }
    ]
}).then(callback); // Send Message 
```

#### Send Email:

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    "AuthToken": "[Your Auth Token]"
});

var callback = function(data) {
    console.log("Response: ",JSON.stringify(data, null, "  "));
};

client.Messaging.Email.SendMessage({
    FromEmail: "from@test.com",             // Optional : Sets From Email Address - leave blank to use your api username as email sender
    EmailSubject: "Test Email",             // Email Subject
    MessagePlain: "Test Email Body",        // Email Body
    Destinations: [                         // Email Recipients
      { Recipient: "email.one@test.com" },
      { Recipient: "email.two@test.com" }
    ]
}).then(callback); // Send Message  
```


#### Send Fax:

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    "AuthToken": "[Your Auth Token]"
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
};

client.Messaging.Fax.SendMessage({
    Reference: "Test",                      // Optional
    Destinations: [                         // Fax Numbers
        { Recipient:"+6491111111" },
        { Recipient:"+6492222222" }
    ],
    Attachments: [
        "D:/File1.pdf"
    ]         
}).then(callback);   
```

#### Make Call - Text-to-Speech (TTS):

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    "AuthToken": "[Your Auth Token]"
});

var callback = function(data) {
  console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Messaging.TTS.SendMessage({
    MessageToPeople: "Hi there!",               // Message to play
    Destinations: [                             // Recipients
        { Recipient: "+6491111111" },
        { Recipient: "+6492222222" }
    ]
}).then(callback);
```

#### Make Call - Upload MP3 / Wav File:

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    "AuthToken": "[Your Auth Token]"
});

var callback = function(data) {
  console.log("Response:",JSON.stringify(data, null, "  "));
};

client.Messaging.Voice.SendMessage({

    Destinations: [                         // Phone numbers to call
        { Recipient: "+6491111111" },
        { Recipient: "+6492222222" }
    ],

    // Message to play - WAV format, 16-bit, 8000hz recommended
    VoiceFiles: [
        {
            Name: "MessageToPeople",
            File: "D:/File1.wav"
        }
    ]

}).then(callback);  
```

### Reports

Retrieve your message status using `tnzapi` library.

#### Reports - Get Message Status

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
  console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Reports.Status.Poll({
    MessageID: "ID123456",                    // MessageID generated from system OR your message ID if specified
}).then(callback);
```

#### Reports - Get SMS Reply

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

request.Poll(callback);

var callback = function(data) {
  console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Reports.SMSReply.Poll({
    MessageID: "ID123456",                    // MessageID generated from system OR your message ID if specified
    Page: 1                                   // Current location
}).then(callback); 
```

#### Reports - Get SMS Received List

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
  console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Reports.SMSReceived.Poll({
    TimePeriod: 1440                          // Return results from the last x minutes
    RecordsPerPage: 10,
    Page: 1
}).then(callback);    
```

### Actions

Amend your message using `tnzapi` library.

#### Actions - Abort Pending/Delayed Job

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
  console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Actions.Abort.SendRequest({
    MessageID: "ID123456"                     // MessageID generated from system OR your message ID if specified
}).then(callback);
```

#### Actions - Resubmit Failed Job

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Actions.Resubmit.SendRequest({
    MessageID: "ID123456",                   // MessageID generated from system OR your message ID if specified
}).then(callback);  
```

#### Actions - Reschedule DELAYED Job

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
  console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Actions.Reschedule.SendRequest({
    MessageID: "ID123456",                  // MessageID generated from system OR your message ID if specified
    SendTime: "2023-09-01T00:00"            // New Date/Time
}).then(callback);
```

#### Actions - Set Number of Operators on TTS/Voice Job

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
  console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Actions.Pacing.SendRequest({
    MessageID: "ID123456",                    // MessageID generated from system OR your message ID if specified
    NumberOfOperators: 1                      // No of operators
}).then(callback);   
```

### Addressbook - Contacts

Manage your contacts using `tnzapi` library.

#### Contacts - List

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.Contact.List({
    RecordsPerPage: 10,
    Page: 1
}).then(callback);
```

#### Contacts - Detail

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.Contact.Detail({
    ContactID: "[Contact ID]"
}).then(callback);
```

#### Contacts - Create

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.Contact.Create({
    Title: "Mr",
    Company: "TNZ Group",
    FirstName: "First",
    LastName: "Last",
    MobilePhone: "+6421000001",
    ViewBy: "Account",
    EditBy: "Account"
}).then(callback); 
```

#### Contacts - Update

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.Contact.Update({
    ContactID: "[Contact ID]",
    Attention: "Test Attention"
    Title: "Mr",
    Company: "TNZ Group",
    FirstName: "First",
    LastName: "Last",
    MobilePhone: "+64212223333",
    ViewPublic: "Account",
    EditPublid: "Account"
}).then(callback);    
```

#### Contacts - Delete

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.Contact.Delete({
    ContactID: "[Contact ID]"
}).then(callback);   
```

### Addressbook - Contact Group

Manage your contact group relationship using `tnzapi` library.

#### Contact Group - List

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.ContactGroup.List({
    ContactID: "[Contact ID]",
    RecordsPerPage: 10,
    Page: 1
}).then(callback);  
```

#### Contact Group - Detail

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.ContactGroup.Detail({
    ContactID: "[Contact ID]",
    GroupCode: "[Group Code]"
}).then(callback);
```

#### Contact Group - Create

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.ContactGroup.Create({
    ContactID: "[Contact ID]",
    GroupCode: "[Group Code]"
}).then(callback);  
```

#### Contact Group - Delete

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.ContactGroup.Delete({
    ContactID: "[Contact ID]",
    GroupCode: "[Group Code]"
}).then(callback);    
```

### Addressbook - Group

Manage your group using `tnzapi` library.

#### Group - List

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.Group.List({
    RecordsPerPage: 10,
    Page: 1
}).then(callback);
```

#### Group - Detail

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.Group.Detail({
    GroupCode: "[Group Code]"
}).then(callback);  
```

#### Group - Create

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.Group.Create({
    GroupName: "Test Group",
    ViewEditBy: "Account"
}).then(callback); 
```

#### Group - Update

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.Group.Update({
    GroupCode: "[Group Code]",
    GroupName: "Test Group 123",
    SubAccount: "Test",
    ViewEditBy: "Account"
}).then(callback);
```

#### Group - Delete

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.Group.Delete({
    GroupCode: "[Group Code]"
}).then(callback); 
```

### Addressbook - Group Contact

Manage your group contact relationship using `tnzapi` library.

#### Group Contact - List

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.GroupContact.List({
    GroupCode: "[Group Code]",
    RecordsPerPage: 10,
    Page: 1
}).then(callback);  
```

#### Group Contact - Detail

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.ContactGroup.Create({
    ContactID: "[Contact ID]",
    GroupCode: "[Group Code]"
}).then(callback);   
```

#### Group Contact - Create

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.GroupContact.Create({
    GroupCode: "[Group Code]",
    ContactID: "[Contact ID]"
}).then(callback); 
```

#### Group Contact - Delete

```javascript
const TNZAPI = require('tnzapi');

const client = new TNZAPI({
    AuthToken: "[Your Auth Token]"          // Auth Token
});

var callback = function(data) {
    console.log("Response:",JSON.stringify(data, null, "  "));
}

client.Addressbook.GroupContact.Delete({
    GroupCode: "[Group Code]",
    ContactID: "[Contact ID]"
}).then(callback);          
```

### Getting help

If you need help installing or using the library, please check the [TNZ Contact](https://www.tnz.co.nz/About/Contact/) if you don't find an answer to your question.

[apidocs]: https://www.tnz.co.nz/Docs/NodeJSLib/
