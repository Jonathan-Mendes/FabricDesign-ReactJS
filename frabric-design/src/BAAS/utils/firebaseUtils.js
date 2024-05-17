import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

const prodConfig = {
    apiKey: "AIzaSyATI1g7NIpyUaZZ_AGmpYxVawBm4HsfSLs",
    authDomain: "fabric-design-145ac.firebaseapp.com",
    databaseURL: "https://fabric-design-145ac.firebaseio.com",
    projectId: "fabric-design-145ac",
    storageBucket: "fabric-design-145ac.appspot.com",
    messagingSenderId: "775612015608",
    appId: "1:775612015608:web:a3d1e942bca69c2059ec0d"
};

const devConfig = {
    apiKey: "AIzaSyATI1g7NIpyUaZZ_AGmpYxVawBm4HsfSLs",
    authDomain: "fabric-design-145ac.firebaseapp.com",
    databaseURL: "https://fabric-design-145ac.firebaseio.com",
    projectId: "fabric-design-145ac",
    storageBucket: "fabric-design-145ac.appspot.com",
    messagingSenderId: "775612015608",
    appId: "1:775612015608:web:a3d1e942bca69c2059ec0d"
};

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

// Use this to initialize the firebase App
export const firebaseImpl = firebase.initializeApp(config);
export const firebaseFirestore = firebase.firestore();
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();