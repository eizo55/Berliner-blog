import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-4xl mx-auto flex-col md:flex-row ">
        {" "}
        {/* left */}
        <div className="flex-1">
          <Link
            to="/"
            className=" text-nowrap font-bold dark:text-white text-4xl"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-primary-500 to-pink-500 rounded-lg text-white">
              Berlin auf English
            </span>
            Blog
          </Link>
          <p className="test-sm mt-5">
            All what you need to know about Berlin in one site! to continue sign
            up with your email and password or with Google
          </p>
        </div>
        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-900 dark:text-white"
              >
                Your username
              </label>
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Email
              </label>
              <TextInput type="email" placeholder="Email" id="email" />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Password
              </label>
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button
              className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
              type="submit"
            >
              Sign up
            </Button>
          </form>
          <div className="flex gap-2 mt-3 text-sm">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
