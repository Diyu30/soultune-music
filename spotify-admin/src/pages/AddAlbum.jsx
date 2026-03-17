import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [color, setColour] = useState("#121212");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("bgColour", color);

      const response = await axios.post(`${url}/api/album/add`, formData);

      if (response.data.success) {
        toast.success("Album Added");
        setName("");
        setDesc("");
        setImage(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error occured");
    }
    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600 font-medium"
    >
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            className="w-24 cursor-pointer"
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt=""
          />
        </label>
      </div>

      <div className="flex flex-col gap-2.5">
        <p className="text-md font-semibold">Album Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="bg-[#ededed] text-black border-2 border-gray-400 p-[10px] w-[max(40vw,250px)] rounded-md shadow-md focus:border-[#007537] focus:ring-0 focus:ring-[#007537] transition-all duration-200 outline-none"
          placeholder="Type Here"
          type="text"
          required
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p className="text-md font-semibold">Album Description</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className="bg-[#ededed] text-black border-2 border-gray-400 p-[10px] w-[max(40vw,250px)] rounded-md shadow-md focus:border-[#007537] focus:ring-0 focus:ring-[#007537] transition-all duration-200 outline-none"
          placeholder="Type Here"
          type="text"
          required
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Background Colour</p>
        <input
          onChange={(e) => setColour(e.target.value)}
          value={color}
          type="color"
        />
      </div>

      <button
        type="submit"
        className="text-base bg-[#242424] text-white py-2.5 px-14 cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;
