import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { credentials } from "./credentials.js";

initializeApp({
  credential: cert(credentials),
});

const db = getFirestore();



const car = { make: "Audi", model: "A3", year: 2018, color: "grey" };

db.collection("cars").add(car);
