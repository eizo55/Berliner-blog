import { Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const fileSelectorRef = useRef();
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

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  return (
    <div className="max-w-lag mx-auto p-3 w-full">
      {" "}
      <h1 className="ml-4 my-7 font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-5 max-w-xl self-center mx-auto">
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
        />
        <TextInput
          type="email"
          id="email"
          placeholder="username"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
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
    </div>
  );
}
