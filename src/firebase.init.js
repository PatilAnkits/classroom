import {initializeApp} from 'firebase'



const app = initializeApp(
    {
        apiKey: "AIzaSyC-ACPzKI3ufJ9INPuyH8XaLIhP2qh2nhc",
        authDomain: "webrtctest-16063.firebaseapp.com",
        databaseURL: "https://webrtctest-16063.firebaseio.com",
        projectId: "webrtctest-16063",
        storageBucket: "webrtctest-16063.appspot.com",
        messagingSenderId: "771984679332",
        appId: "1:771984679332:web:2a6d0fbeaf7c4fb954a131",
        measurementId: "G-BXYZYZMMQS"
      }
);

export const fire = app
export const db = app.database();
