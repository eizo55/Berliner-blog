import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function () {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lag mx-auto p-3 w-full">
      {" "}
      <h1 className="ml-4 my-7 font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-5 max-w-xl self-center mx-auto">
        <div className="w-36 h-36 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
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
