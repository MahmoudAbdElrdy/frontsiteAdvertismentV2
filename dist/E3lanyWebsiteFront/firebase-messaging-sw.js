importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');

importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAviWG3j_rbM2V5UncS4Aplcc4IMt4Yj1k",
    authDomain: "addvertisment-3b97f.firebaseapp.com",
    projectId: "addvertisment-3b97f",
    storageBucket: "addvertisment-3b97f.appspot.com",
    messagingSenderId: "13816541943",
    appId: "1:13816541943:web:17c490e25503f8b8f659f2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();