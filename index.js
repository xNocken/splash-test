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
const password = 'Meridstem';


function writeNewPost() {
    var updates = {};

    updates['users/data'] = JSON.parse(fs.readFileSync('data.json'));
  
    return firebase.database().ref().update(updates);
}

function registerUsername(username) {
    const object = {
    };

    object['lastSeen'] = '15.03.2020 12:30';
    object['status'] = 'Youtube.com/xNocken';
    object[firebase.auth().currentUser.uid] = 'https://firebasestorage.googleapis.com/v0/b/proj-splash.appspot.com/o/users%2Ficons%2FxNocken?alt=media&token=20985e83-5203-4167-9b37-5f828ce01ce9';

    firebase.database().ref('users/data').child(firebase.auth().currentUser.uid).update(object);
}

const getPosts = () => {
    var topUserPostsRef = firebase.database().ref('users/data').once('value').then(function(snapshot) {
        var username = snapshot;
        
        console.log(username.val());
        fs.writeFileSync('./data.json', JSON.stringify(username.val()));
    });
}

firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    console.log('error', error.code, error.message);
}).then(() => {
    // writeNewPost();
    // getPosts();
    // registerUsername('Test');
});
