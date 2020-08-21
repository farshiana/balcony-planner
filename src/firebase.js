import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBCbWXxfwNEOTVOxz4kaMWTWjAONUszoj8',
    authDomain: 'balcony-c7297.firebaseapp.com',
    databaseURL: 'https://balcony-c7297.firebaseio.com',
    projectId: 'balcony-c7297',
    storageBucket: 'balcony-c7297.appspot.com',
    messagingSenderId: '348972347186',
    appId: '1:348972347186:web:4dd7655c7d74f27c35b12b',
    measurementId: 'G-WRF21P5YCS',
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export const auth = firebase.auth();

export const users = db.collection('users');
