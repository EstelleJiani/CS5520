// addDoc will automatically add a ids, addSet will ask for ID 
import { collection, addDoc } from "firebase/firestore"; 
import { database } from "./firebaseSetup";
import { doc, deleteDoc } from 'firebase/firestore';

export async function writeToDB(collectionName, data) {
  // console.log(database);
  // console.log(collectionName);
  // console.log(data);
  try {
    addDoc(collection(database, collectionName), data);
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log(docRef);
  } catch (err) {
    console.error("write to db ", err);
  }
}

export async function deleteFromDB(collectionName, deleteId) {
  try {
    await deleteDoc(doc(database, collectionName, deleteId));
  }
  catch (err) {
    console.log("delete from DB ", err);
  }
}