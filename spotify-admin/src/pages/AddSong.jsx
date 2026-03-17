import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

const AddSong = () => {
  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [artists, setArtists] = useState([]); // Change state to hold multiple artists
  const [artistData, setArtistData] = useState([]); // Store artist list
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("audio", song);
      formData.append("album", album);
      artists.forEach((artist) => {
        formData.append("artist", artist);
      });
      
      const response = await axios.post(`${url}/api/song/add`, formData);

      if (response.data.success) {
        toast.success("Song Added");
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(false);
        setSong(false);
        setArtists(""); // Clear artist field after successful submit
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error occured");
    }
    setLoading(false);
  };

  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);

      if (response.data.success) {
        setAlbumData(response.data.albums);
      } else {
        toast.error("Unable to load album data");
      }
    } catch (error) {
      toast.error("Error occur");
    }
  };

  // Load artist list from API
  const loadAlbumAndArtistData = async () => {
    try {
      const albumResponse = await axios.get(`${url}/api/album/list`);
      const artistResponse = await axios.get(`${url}/api/artist/list`); // Fetch artists
  
      if (albumResponse.data.success) {
        setAlbumData(albumResponse.data.albums);
      } else {
        toast.error("Unable to load album data");
      }
  
      if (artistResponse.data.success) {
        setArtistData(artistResponse.data.artists); // Set artist data
      } else {
        toast.error("Unable to load artist data");
      }
    } catch (error) {
      toast.error("Error occurred while fetching data");
    }
  };
    
  useEffect(() => {
    loadAlbumData();
    loadAlbumAndArtistData();
  }, []);

    // Handle checkbox selection
    const handleArtistChange = (e) => {
      const selectedArtists = [...artists];
      if (e.target.checked) {
        selectedArtists.push(e.target.value);
      } else {
        const index = selectedArtists.indexOf(e.target.value);
        if (index > -1) {
          selectedArtists.splice(index, 1);
        }
      }
      setArtists(selectedArtists);
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
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input
            onChange={(e) => setSong(e.target.files[0])}
            type="file"
            id="song"
            accept="audio/*"
            hidden
          />
          <label htmlFor="song">
            <img
              src={song ? assets.upload_added : assets.upload_song}
              className="w-24 cursor-pointer"
              alt=""
            />
          </label>
        </div>
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
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="w-24 cursor-pointer"
              alt=""
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song Name</p>
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
        <p>Song Description</p>
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
        <p>Artists</p>
        <div className="grid grid-cols-3 gap-6">
        {artistData.map((item, index) => (
          <label key={index} className="flex flex-row items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              value={item.name}
              checked={artists.includes(item.name)}
              onChange={handleArtistChange}
            />
            {item.name}
          </label>
        ))}
        </div>
       
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select
          onChange={(e) => setAlbum(e.target.value)}
          defaultValue={album}
          className="w-[200px] px-4 py-2 bg-transparent focus:border-[#007537] focus:ring-0 focus:ring-[#007537] border-2 border-gray-400 p-3 rounded-md shadow-md cursor-pointer"
        >
          <option value="none">None</option>
          {albumData.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
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

export default AddSong;
