import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    setImageUploading(true);
    const data = new FormData();
    data.append("file", selectedImage);
    data.append("upload_preset", "Berliner_blog");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxcdq06uk/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const cloudData = await res.json();

      if (res.ok) {
        setImagePreviewUrl(cloudData.secure_url);
        setFormData({ ...formData, image: cloudData.secure_url });
      } else {
        console.error("Upload failed", cloudData);
      }
    } catch (err) {
      console.error("Image upload error:", err);
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4  sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            className="sm:w-40"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="music">Music</option>
            <option value="art">Art</option>
            <option value="technology">Technology</option>
          </Select>
        </div>
        <div className="flex flex-col gap-2 border-4 border-teal-500 border-dotted p-3">
          <div className="flex items-center gap-4 justify-between">
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              className="w-72"
            />
            <Button
              type="button"
              onClick={handleImageUpload}
              disabled={imageUploading || !selectedImage}
              className="w-40 h-9 bg-gradient-to-br from-purple-500 to-blue-500 hover:from-blue-700 hover:to-purple-700"
            >
              {imageUploading ? "Uploading..." : "Upload Image"}
            </Button>
          </div>

          {imageUploading && (
            <div className="flex justify-center items-center mt-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-solid" />
            </div>
          )}

          {imagePreviewUrl && (
            <img
              src={imagePreviewUrl}
              alt="uploaded"
              className="mt-4 max-h-64 object-contain rounded-md border"
            />
          )}
        </div>

        <ReactQuill
          onChange={(value) => setFormData({ ...formData, content: value })}
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
        />
        <Button
          type="Submit"
          className="bg-gradient-to-br from-purple-500 to-pink-500  hover:from-pink-700 hover:to-purple-700 cursor-pointer"
        >
          Publish
        </Button>
        {publishError && (
          <Alert color="failure" className="mt-5">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
