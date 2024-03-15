import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDi3cLMpKVIaCIbdcEOkhZ7fU2C1ndiqmw",
  authDomain: "santandereanorestaurante-effa9.firebaseapp.com",
  projectId: "santandereanorestaurante-effa9",
  storageBucket: "santandereanorestaurante-effa9.appspot.com",
  messagingSenderId: "99507726688",
  appId: "1:99507726688:web:b78a56cdfd1e17a1311605",
  measurementId: "G-X31FL9TZ5M"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export default db;