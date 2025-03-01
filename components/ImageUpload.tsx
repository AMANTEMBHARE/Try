"use client";
import { useState } from "react";

export default function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false); // ✅ State for popup message

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      onUpload(data.imageUrl);
      setUploadSuccess(true); // ✅ Show success popup

      setTimeout(() => {
        setUploadSuccess(false); // ✅ Hide popup after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image.");
    }
  };

  return (
    <div className="space-y-4 relative">
      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="imageInput" />
      <label htmlFor="imageInput" className="cursor-pointer px-4 py-2 bg-gray-200 text-black rounded-md">Select Image</label>

      {preview && <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-md" />}

      <button type="button" onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Upload Image
      </button>

      {/* ✅ Popup Message for Upload Success */}
      {uploadSuccess && (
        <div className="absolute top-0 right-0 mt-2 p-2 bg-green-500 text-white rounded-md shadow-lg">
          ✅ Image Uploaded Successfully!
        </div>
      )}
    </div>
  );
}
