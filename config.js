import * as firebase from "firebase"
require("@firebase/firestore")

var firebaseConfig = {
  apiKey: "AIzaSyAclrtTJ7o4YBFBMtoCvcnrXiInHzSoqoE",
  authDomain: "project71-10ba6.firebaseapp.com",
  projectId: "project71-10ba6",
  storageBucket: "project71-10ba6.appspot.com",
  messagingSenderId: "785191511701",
  appId: "1:785191511701:web:aa7313c70992b66e811d9c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore()