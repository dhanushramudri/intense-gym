// src/hooks/useEditableImage.js
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// imageId: unique string like "hero-main", "gallery-1", etc.
// fallback: original hardcoded URL
export const useEditableImage = (imageId, fallback) => {
  const [src, setSrc] = useState(fallback);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // ✅ Load saved image from Firestore
  useEffect(() => {
    const load = async () => {
      try {
        const docRef = doc(db, 'site-images', imageId);
        const snap = await getDoc(docRef);
        if (snap.exists() && snap.data().url) {
          setSrc(snap.data().url);
        }
      } catch (e) {
        console.error("Failed loading image:", e);
      }
    };
    load();
  }, [imageId]);

  // ✅ Upload to Cloudinary instead of Firebase Storage
  const uploadImage = (file) => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    const cloudName = "dubsim13p"; // ← your cloud name
    const uploadPreset = "intense-fitness-preset"; // ← unsigned preset

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = async () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const url = response.secure_url;

        // ✅ Save URL to Firestore
        await setDoc(doc(db, 'site-images', imageId), {
          url,
          updatedAt: new Date().toISOString(),
        });

        setSrc(url);
      } else {
        console.error("Upload failed:", xhr.responseText);
      }

      setUploading(false);
      setProgress(0);
    };

    xhr.onerror = () => {
      console.error("Upload error");
      setUploading(false);
    };

    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    );

    xhr.send(formData);
  };

  return { src, uploading, progress, uploadImage };
};