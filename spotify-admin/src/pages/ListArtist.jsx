import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../App';
import { toast } from 'react-toastify';

const ListArtist = () => {
  const [data, setData] = useState([]);

  // Fetching artist data from the backend
  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${url}/api/artist/list`);

      if (response.data.success) {
        setData(response.data.artists); // Assuming 'artists' is the correct field in the response
      } else {
        toast.error("Failed to load artists.");
      }

    } catch (error) {
      toast.error("Error occurred while fetching artist data.");
    }
  }

  // Remove artist by their ID
  const removeArtist = async (id) => {
    try {
      const response = await axios.post(`${url}/api/artist/remove`, { id });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchArtists(); // Refresh the list after removal
      } else {
        toast.error("Failed to remove artist.");
      }

    } catch (error) {
      toast.error("Error occurred while removing artist.");
    }
  }

  useEffect(() => {
    fetchArtists(); // Fetch artists when the component mounts
  }, []);

  return (
    <div className='w-[50vw]'>
      <p className="text-xl font-semibold mb-5">All Artist List</p>
      <div className="overflow-x-auto">
        <div className='grid grid-cols-[1fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
            <img className='w-12 rounded-sm aspect-[1]' src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <button
              className="text-red-500 hover:text-red-700 w-4"
              onClick={() => removeArtist(item._id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListArtist;
