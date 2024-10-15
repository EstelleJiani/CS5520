// addDoc will automatically add a ids, addSet will ask for ID 
import { collection, addDoc, query } from "firebase/firestore"; 
import { database } from "./firebaseSetup";
import { doc, deleteDoc, getDocs } from 'firebase/firestore';

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

// export async function deleteAllFromDB(collectionName) {
//   // try {
//   //   const querySnapshot = await collection(database, collectionName);
//   //   querySnapshot.forEach((doc) => {
//   //     deleteDoc(doc);
//   //   });
//   // } catch (err) {
//   //   console.log("delete all from DB ", err);
//   // }
// }

export async function deleteAllFromDB(collectionName) {
  try{
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((docSnapshot) => {
      deleteFromDB(collectionName, docSnapshot.id);
    });
  } catch (err) {
    console.log("delete all from db", err);
  }
}