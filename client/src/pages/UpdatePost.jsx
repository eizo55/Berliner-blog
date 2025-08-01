import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const { currentUser } = useSelector((state) => state.user);
  const { postId } = useParams();
  const navigate = useNavigate();

  // Fetch post data on mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok) {
          setPublishError(data.message);
        } else {
          setFormData(data.posts[0]);
          setImagePreviewUrl(data.posts[0].image); // Show existing image
          setPublishError(null);
        }
      } catch (error) {
        setPublishError("Failed to fetch post data.");
      }
    };

    fetchPost();
  }, [postId]);

  // Upload to Cloudinary
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
        setFormData((prev) => ({ ...prev, image: cloudData.secure_url }));
        setImagePreviewUrl(cloudData.secure_url);
      } else {
        console.error("Upload failed", cloudData);
        setPublishError("Image upload failed.");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setPublishError("Image upload error.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
      } else {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong.");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            value={formData.title || ""}
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Select
            className="sm:w-40"
            value={formData.category || "uncategorized"}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="music">Music</option>
            <option value="art">Art</option>
            <option value="technology">Technology</option>
          </Select>
        </div>

        {/* Image Upload */}
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
              className="w-40 h-9 bg-gradient-to-br from-purple-500 to-blue-500 hover:from-blue-700 hover:to-purple-700 cursor-pointer"
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
              alt="Uploaded"
              className="mt-4 max-h-64 object-contain rounded-md border"
            />
          )}
        </div>

        {/* Content Editor */}
        <ReactQuill
          theme="snow"
          value={formData.content || ""}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, content: value }))
          }
          placeholder="Write something..."
          className="h-72 mb-12"
        />

        {/* Submit */}
        <Button
          type="submit"
          disabled={imageUploading}
          className="bg-gradient-to-br from-purple-500 to-pink-500 hover:from-pink-700 hover:to-purple-700 cursor-pointer"
        >
          {imageUploading ? "Wait for image..." : "Update Post"}
        </Button>

        {/* Error Alert */}
        {publishError && (
          <Alert color="failure" className="mt-5">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
