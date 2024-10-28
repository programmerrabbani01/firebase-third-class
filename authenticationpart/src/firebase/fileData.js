import { getStorage } from "firebase/storage";
import { firebaseApp } from "./app.js";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// Initialize Firebase Storage
export const firebaseStorage = getStorage(firebaseApp);

/**
 * Upload File to Firebase Storage
 * @param {File} file - The file to upload.
 * @returns {Promise<string>} - The download URL of the uploaded file.
 */
export const uploadFile = async (file) => {
  // Check if file is provided
  if (!file) {
    throw new Error("No file provided for upload.");
  }

  // Upload file and get reference to the uploaded file
  const fileData = await uploadBytesResumable(
    ref(firebaseStorage, file.name),
    file
  );

  // Get the download URL of the uploaded file
  const fileLink = await getDownloadURL(fileData.ref);

  // Return file link
  return fileLink;
};
