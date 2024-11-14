// src/hooks/useFirebaseUpload.js
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // Make sure the path is correct to your firebase.js file

const useFirebaseUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);

  const uploadFile = (file,path) => {
    if (!file) {
      setError("No file selected");
      return;
    }

    setUploading(true);
    setError(null);

    const storageRef = ref(storage, path); // Set the storage reference
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress tracking can be implemented here if needed
      },
      (error) => {
        setError(`Error: ${error.message}`);
        setUploading(false);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setDownloadURL(url);
          setUploading(false);
        } catch (err) {
          setError(`Error retrieving download URL: ${err.message}`);
          setUploading(false);
        }
      }
    );
  };

  return { uploadFile, uploading, error, downloadURL };
};

export default useFirebaseUpload;