// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");
const fs = require('fs');

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require('firebase/database');

var firebaseConfig = {
    apiKey: "AIzaSyAs_0xp4tcGw-Zxqe3lixsfli47AP8Qvbw",
    authDomain: "proj-splash.firebaseapp.com",
    databaseURL: "https://proj-splash.firebaseio.com",
    projectId: "proj-splash",
    storageBucket: "proj-splash.appspot.com",
    messagingSenderId: "316567879036",
}


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const email = 'creponcreeper@gmail.com';
const password = 'Passwort';


function writeNewPost() {
    var updates = {};

    updates['texts/public/'] = JSON.parse(fs.readFileSync('messages.json'));
  
    return firebase.database().ref().update(updates);
}

const getPosts = () => {
    var topUserPostsRef = firebase.database().ref('texts/public').once('value').then(function(snapshot) {
        var username = snapshot;
        
        console.log(username.val());
        fs.writeFileSync('./messages.json', JSON.stringify(username.val())).catch((err) => {
            console.log(err);
        }).then(() => {
            console.log('successfully replaced database')
        });
    });
}

firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    console.log('error', error.code, error.message);
}).then(() => {
    writeNewPost();
    // getPosts();
});
