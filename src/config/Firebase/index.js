import firebase from "@react-native-firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA18c6M678xr6nNBcFyn3Co-xDOPaX0HKE",
    authDomain: "asetkripto-b5eec.firebaseapp.com",
    projectId: "asetkripto-b5eec",
    storageBucket: "asetkripto-b5eec.appspot.com",
    messagingSenderId: "549226011805",
    appId: "1:549226011805:web:d4eee715174b88545a0874",
};

firebase.initializeApp(firebaseConfig);

const Firebase = firebase;

export default Firebase;
