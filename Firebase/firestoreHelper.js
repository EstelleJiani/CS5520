// addDoc will automatically add a ids, addSet will ask for ID 
import { collection, addDoc, doc, deleteDoc, getDocs, updateDoc} from "firebase/firestore"; 
import { database } from "./firebaseSetup";

export async function writeToDB(collectionName, data) {
  // console.log(database);
  // console.log(collectionName);
  // console.log(data);
  try {
    // addDoc(collection(database, collectionName), data);
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log(docRef);
  } catch (err) {
    console.error("Write to db ", err);
  }
}

export async function deleteFromDB(collectionName, deleteId) {
  try {
    await deleteDoc(doc(database, collectionName, deleteId));
  }
  catch (err) {
    console.log("Delete from DB ", err);
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
    console.log("Delete all from DB", err);
  }
}

export async function updateFieldInDB (collectionName, docId, data) {
  try {
    // Create a reference to the document to be updated
    const docRef = doc(database, collectionName, docId);

    // Use updateDoc to update an existing document
    await updateDoc(docRef, data);
    console.log("Document updated");
  } catch (err) {
    console.log("Update field in DB ", err);
  }
}


export async function getAllDocuments(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    const data = [];
  if (!querySnapshot.empty) {
    querySnapshot.forEach((docSnap) => {
    data.push(docSnap.data());
  });
    console.log(data);
    return data;
  } 
  } catch (err) 
  {
    console.log("Get all documents ", err);
  }
}