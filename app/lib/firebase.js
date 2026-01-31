import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAgVehIODXr6vq9cUNNCxi08B6uz1I5CRs",
  authDomain: "udhar-khata-db75c.firebaseapp.com",
  databaseURL: "https://udhar-khata-db75c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "udhar-khata-db75c",
  storageBucket: "udhar-khata-db75c.firebasestorage.app",
  messagingSenderId: "931221194213",
  appId: "1:931221194213:web:531737e54c86996d18386c"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);