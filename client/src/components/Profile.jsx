import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFaliure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSucess,
  signOutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserFailure, setUpdateUserFaliure] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fileSelectorRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    setImageFileUrl(null); // Optional: clear existing image during upload

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Berliner_blog");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxcdq06uk/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const dataFromApi = await res.json();

      if (res.ok) {
        setImageFile(file);
        setImageFileUrl(dataFromApi.secure_url);
        setFormData({ ...formData, profilePicture: dataFromApi.secure_url });
      } else {
        console.error("Upload error:", dataFromApi);
      }
    } catch (error) {
      console.error("Cloudinary error:", error);
    } finally {
      setUploadingImage(false);
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

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      }
      dispatch(deleteUserSucess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
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
        className="flex flex-col gap-6 max-w-xl self-center mx-auto"
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
          className="w-36 h-36 self-center cursor-pointer shadow-md overflow-hidden rounded-full flex items-center justify-center bg-gray-100"
          onClick={() => fileSelectorRef.current.click()}
        >
          {uploadingImage ? (
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
          ) : (
            <img
              src={imageFileUrl || currentUser.profilePicture}
              alt="user"
              className="rounded-full w-full h-full border-6 object-cover border-[lightgray]"
            />
          )}
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
          className=" bg-gradient-to-br from-purple-500 to-blue-500 hover:from-blue-700 hover:to-purple-700 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to="/create-post">
            <Button
              type="submit"
              className=" bg-gradient-to-br from-pink-500 to-purple-500 w-full hover:from-purple-700 hover:to-pink-700 cursor-pointer"
            >
              Create a post
            </Button>
          </Link>
        )}

        <div className="text-red-500 flex justify-between ">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => setShowModal(true)}
          >
            Delete Account
          </span>
          <span
            className="cursor-pointer hover:underline"
            onClick={handleSignout}
          >
            Sign Out
          </span>
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
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className=" h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="bg-red-600" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button
                className="bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
