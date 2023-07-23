import { storage } from "@/firebase/firebaseApp";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function uploadImage(path: string, file: File): Promise<string> {
  try {
    const imageRef = ref(storage, path);
    await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    throw error;
  }
}
