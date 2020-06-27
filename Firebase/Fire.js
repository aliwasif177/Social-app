import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBZbX7vOt9hgc6jJ0JSw00pJDuQXXQJzpw",
  authDomain: "socialapp-6449c.firebaseapp.com",
  databaseURL: "https://socialapp-6449c.firebaseio.com",
  projectId: "socialapp-6449c",
  storageBucket: "socialapp-6449c.appspot.com",
  messagingSenderId: "85795629933",
  appId: "1:85795629933:web:5a334f133d53e45479c864",
};
let fire = firebase.initializeApp(firebaseConfig);
export default fire;
