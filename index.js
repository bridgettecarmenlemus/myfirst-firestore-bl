import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { credentials } from "./credentials.js";

initializeApp({
  credential: cert(credentials),
});

const db = getFirestore();

db.collection("cars")
    .add({ make: "Ferari", model: "GTO", year: 2008, color: "red" })
    .then(doc => {
        console.log('Doc added:', doc.id)
    })
    .catch(err => console.error(err))


db.collection ("cars").doc("lambo")
    .set({ make: "Lamborghini", model: "Diablo", year: 2020, color: "yellow"})

db.collection("cars").doc("lambo")
    .update({ model: "Diablo", color: "Hot Pink" })

db.collection("cars").doc("lambo").get()
    .then(doc => {
        console.log(doc.id)
        console.log(doc.data())
    })
    .catch(console.error)

// get a whole collection
db.collection("cars").get()
    .then(collection => {
        collection.docs.forEach(doc => console.log(doc.id, doc.data()))
    })
    .catch(console.error)

// query docs from collection:
db.collection("cars")
    .where("year", ">=", 2015)
    .get()
        .then(collection => {
      const cars = collection.docs.map(doc => {
        let car = doc.data() //{ make,model, color, year}
        car.id = doc.id // { make. model color, yera, id }
        return car 
    })
      (console.log(cars))
    })
    .catch(console.error)
