import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFaliure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserFailure, setUpdateUserFaliure] = useState(null);

  const fileSelectorRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    console.log("Uploading Image...");
    /* to be implemented later */
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserFaliure(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserFaliure("no changes were made");
      return;
    }

    try {
      console.log("Dispatching start");
      dispatch(updateStart());

      console.log("Before fetch");
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("After fetch - I'm here!");

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFaliure(data.message));
        setUpdateUserFaliure(data.message);
      } else {
        console.log("Dispatching success", data);
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Your profile updated successfully");
      }
    } catch (error) {
      console.error("Caught error:", error);
      dispatch(updateFaliure(error.message));
      setUpdateUserFaliure(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  return (
    <div className="max-w-lag mx-auto p-3 w-full">
      {" "}
      <h1 className="ml-4 my-7 font-semibold text-3xl">Profile</h1>
      <form
        className="flex flex-col gap-5 max-w-xl self-center mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileSelectorRef}
          hidden
        />
        <div
          className="w-36 h-36 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => fileSelectorRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-6 object-cover border-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="username"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="bg-gradient-to-br from-purple-500 to-blue-500"
        >
          Update
        </Button>
        <div className="text-red-500 flex justify-between ">
          <span>Delete Account</span>
          <span>Sign Out</span>
        </div>
      </form>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserFailure && (
        <Alert color="failure" className="mt-5">
          {updateUserFailure}
        </Alert>
      )}
    </div>
  );
}
