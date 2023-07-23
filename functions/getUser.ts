import { firestore } from "@/firebase/firebaseApp";
import { doc, getDoc } from "firebase/firestore";

export async function getUser(id: string) {
  try {
    const docRef = doc(firestore, "users", id);
    const userDoc = await getDoc(docRef);
    if (!userDoc.exists()) throw new Error("Oops. Please try again later.");
    return userDoc.data();
  } catch (error) {
    throw error;
  }
}
