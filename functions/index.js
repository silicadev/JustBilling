const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.

//const functions = require('firebase-functions'); --RAVI

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
//TBD- serviceAccount = "../../../firebase-justbilling-credentials/just-billing-759d2-firebase-adminsdk-bk19n-314407959b.json"
admin.initializeApp(functions.config().firebase);

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  console.log("URL:"+req);
  // Grab the text parameter.
  const original = req.query.text;
  const idToken = req.query.tokenId;

  //RAVI- Adding auth to access the URL

  admin.auth().verifyIdToken(idToken)
      .then(
        function(decodedToken) {
        var uid = decodedToken.uid;
        // ...
        // Push the new message into the Realtime Database using the Firebase Admin SDK.
        admin.database().ref('/messages').push({original: original}).then(snapshot => {
         // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
          res.redirect(303, snapshot.ref);
        });
      }
      ).catch(function(error) {
        // Handle error
        console.log(error);
      });
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const original = event.data.val();
      console.log('Uppercasing', event.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return event.data.ref.parent.child('uppercase').set(uppercase);
    });

exports.createUser = functions.https.onRequest((req, res) => {
        const userID = req.query.userID;
        const password = req.query.password;
        const displayName = req.query.displayName;
        const idToken = req.query.tokenId;

  //RAVI- Adding auth to access the URL

  admin.auth().verifyIdToken(idToken)
      .then(
        function(decodedToken) {
        //var uid = decodedToken.uid;
         admin.auth().createUser({
                                uid: userID,
                                password: password,
                                displayName:displayName
                                })
                                .then(function(userRecord) {
                                    // See the UserRecord reference doc for the contents of userRecord.
                                    console.log("Successfully created new user:", userRecord.uid);
                                     res.end();
                                })
                                .catch(function(error) {
                                      console.log("Error creating new user:", error);
                                });
        });
      });


exports.signInwithUserID = functions.https.onRequest((req, res) => {
        const uid = req.query.userID;
        const password = req.query.password;

  admin.auth().getUser(uid)
    .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully fetched user data:", userRecord.toJSON());
    const userData= userRecord.toJSON();

    if (userData.password === password){
      admin.auth().createCustomToken(uid)
        .then(function(customToken) {
        // Send token back to client
        //return customToken;
        res.send("CustomToke:"+customToken);
    })
      .catch(function(error) {
          console.log("Error creating custom token:", error);
          //return "Error creating custom token:"+ error;
          res.send("Error creating custom token:"+ error);
      });
    }
    else{
      return "User ID and Password not matching:"+ uid+password;
    }

  })
  .catch(function(error) {
    console.log("Error fetching user data:"+uid, error);
  });

  // admin.auth().verifyIdToken(idToken)
  //     .then(
  //       function(decodedToken) {
  //       //var uid = decodedToken.uid;
  //        admin.auth().createUser({
  //                               uid: userID,
  //                               password: password,
  //                               displayName:displayName
  //                               })
  //                               .then(function(userRecord) {
  //                                   // See the UserRecord reference doc for the contents of userRecord.
  //                                   console.log("Successfully created new user:", userRecord.uid);
  //                                    res.end();
  //                               })
  //                               .catch(function(error) {
  //                                     console.log("Error creating new user:", error);
  //                               });
  //       });
      });