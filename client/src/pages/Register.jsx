import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import uploadFile from "../helper/uploadFile";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [uploadPhoto, setUploadPhoto] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prevs) => {
      return {
        ...prevs,
        [name]: value,
      };
    });
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file);
    console.log("uploadPhoto", uploadPhoto);

    setUploadPhoto(file);
  };

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="mt-5 flex justify-center">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4">
        <h3 className="flex justify-center font-semibold text-2xl text-blue-500">
          Welcome to Chat app!
        </h3>

        <form onSubmit={handleSubmit} id="register" className="grid gap-4 mt-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="name"> Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Name"
              className="bg-slate-100 px-2 py-3 focus:outline-red-500"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              className="bg-slate-100 px-2 py-3 focus:outline-red-500"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              className="bg-slate-100 px-2 py-3 focus:outline-red-500"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Photo:
              <div className="h-14 bg-slate-200 flex justify-center items-center rounded hover:border-2 hover:border-red-500 cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadPhoto.name
                    ? uploadPhoto?.name
                    : "Upload Profile photo"}
                </p>
                {uploadPhoto.name && (
                  <button
                    className="text-lg ml-2 hover:text-red-500"
                    onClick={handleClearUploadPhoto}
                  >
                    <IoCloseSharp />
                  </button>
                )}
              </div>
            </label>
            <input
              type="file"
              id="profile_pic"
              accept="image/*"
              className="bg-slate-100 px-2 py-3 focus:outline-blue-500 hidden"
              value={data.profile_pic}
              onChange={handleUploadPhoto}
            />
            {uploadPhoto && (
              <img
                src={URL.createObjectURL(uploadPhoto)}
                alt="Preview"
                className="mt-2 w-20 h-20 object-cover rounded-full m-auto"
              />
            )}
          </div>

          <button className="bg-blue-500 text-lg px-4 py-1 hover:bg-blue-600 rounded mt-4 text-white font-bold leading-relaxed tracking-wider cursor-pointer">
            Register
          </button>
        </form>
        <div className="flex justify-center mt-2">
          <p className="hover:text-blue-500 hover:underline font-semi-bold text-sm">
            Already Have Account ?
            <Link to="/email" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
