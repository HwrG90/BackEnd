import admin from "firebase-admin";
import serviceAccount from "./backend-7b48e-firebase-adminsdk-2s1t4-b04ddeccd4.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const FieldValue = admin.firestore.FieldValue;

const db = admin.firestore();
const queryCarritos = db.collection("carritos");
const queryProductos = db.collection("productos");

module.exports = {
  queryCarritos,
  queryProductos,
  FieldValue,
};
