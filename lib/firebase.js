import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAgVehIOdXr6vq9cUNNCxi08B6uzI15cRs",
  authDomain: "udhar-khata-db75c.firebaseapp.com",
  databaseURL: "https://udhar-khata-db75c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "udhar-khata-db75c",
  storageBucket: "udhar-khata-db75c.firebasestorage.app",
  messagingSenderId: "89395250104",
  appId: "1:89395250104:web:2e6bcd7a24828a13fc854d"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
