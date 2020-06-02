import * as firebase from "firebase/app";
import "firebase/auth"; // 認証機能を使用
import "firebase/firestore"; // firebaseのデータベースを使用
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyCemTTDu833HE0T7T5WtBgTiMAqcWjCvP8",
  authDomain: "cv-room-b53fd.firebaseapp.com",
  databaseURL: "https://cv-room-b53fd.firebaseio.com",
  projectId: "cv-room-b53fd",
  storageBucket: "cv-room-b53fd.appspot.com",
  messagingSenderId: "936589455689",
  appId: "1:936589455689:web:9b546e1389d600427b6a98",
  measurementId: "G-YX540T9PXM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
