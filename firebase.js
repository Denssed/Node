import { initializeApp } from 'firebase/app';
import config from './config.js';

const firebase = initializeApp( {apiKey: "AIzaSyADptet-PN2ZYRq1xdz_JMM5rzDwlKhNnk",
authDomain: "iep-admin.firebaseapp.com",
projectId: "iep-admin",
storageBucket: "iep-admin.appspot.com",
messagingSenderId: "305512321306",
appId: "1:305512321306:web:3c27941debec3a8b611ca3",
measurementId: "G-PHEE112617",
storeBucket: 'gs://iep-admin.appspot.com'
});

export default firebase;