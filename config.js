import * as firebase from "firebase"
require("@firebase/firestore")

var firebaseConfig = {
  apiKey: "AIzaSyDCqsiLGh_2NFLO9GBsM9oQVXa0zqlNi6U",
  authDomain: "library-85962.firebaseapp.com",
  projectId: "library-85962",
  storageBucket: "library-85962.appspot.com",
  messagingSenderId: "335403921549",
  appId: "1:335403921549:web:7ce7159bf52b4efe08f2c4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore()