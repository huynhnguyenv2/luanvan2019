import firebase from "firebase-admin";
import serviceAccount from "../serviceAccountKey";

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://airquality-8892d.firebaseio.com"
})

const getFirebase = firebase.database().ref("/nodes");
export default getFirebase;