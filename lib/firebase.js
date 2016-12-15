import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAMckGhIToLPNxEn_1BNGxD-HzIqIEvkac",
  authDomain: "shoot-the-breeze-a9145.firebaseapp.com",
  databaseURL: "https://shoot-the-breeze-a9145.firebaseio.com",
  storageBucket: "shoot-the-breeze-a9145.appspot.com",
  messagingSenderId: "357952948053"
};

export default firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// export default firebase;
// export const signIn = () => auth.signInWithPopup(provider);
// export const reference = firebase.database().ref('messages');
