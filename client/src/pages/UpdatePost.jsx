import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { postId } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    console.log("fetching data", postId);
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setFormData(data.posts[0]);
          setPublishError(null);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
    console.log(formData);
  }, [postId]);
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4  sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            value={formData.title}
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
            <option
              value={formData.category ? formData.category : "uncategorized"}
            >
              {formData.category ? formData.category : "Select a category"}
            </option>
            <option value="music">Music</option>
            <option value="art">Art</option>
            <option value="technology">Technology</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" className="w-70" />
          <Button
            type="button"
            className="w-40 h-9 bg-gradient-to-br from-purple-500 to-blue-500 "
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill
          onChange={(value) => setFormData({ ...formData, content: value })}
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          value={formData.content}
        />
        <Button
          type="Submit"
          className="bg-gradient-to-br from-purple-500 to-pink-500"
        >
          Update post
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
