import React, { useState } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const AddArtist = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/artist/add`, formData);

      if (response.data.success) {
        toast.success("Artist Added");
        setName("");
        setImage(null);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error occurred");
    }
    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-8 text-gray-600 font-medium">

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
        <p>Artist Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="bg-[#ededed] text-black border-2 border-gray-400 p-[10px] w-[max(40vw,250px)] rounded-md shadow-md"
          placeholder="Enter Artist Name"
          required
        />
      </div>

      <button
        type="submit"
        className="text-base bg-[#242424] text-white py-2.5 px-14 mt-3 cursor-pointer w-[145px]"
      >
        ADD
      </button>
    </form>
  );
};

export default AddArtist;