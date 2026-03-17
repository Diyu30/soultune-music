import React, { useEffect, useState } from 'react'
import { url } from '../App';
import axios from 'axios'
import { toast } from 'react-toastify';

const ListSong = () => {

  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {

      const response = await axios.get(`${url}/api/song/list`);

      if (response.data.success) {
          setData(response.data.songs);
      }

    } catch (error) {
      toast.error("Error occured ");
    }
  }

  const removeSong = async (id) => {
    try {
      
      const response = await axios.post(`${url}/api/song/remove`, {id});

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      }

    } catch (error) {
      toast.error("Error occured");
    }
  }

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className='mb-[30px]'>
      <p>All Song List</p>
      <br />
      <div>
        <div className='grid grid-cols-[0.5fr_1.5fr_1fr_1.5fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Artists</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
            return (
              <div key={index} className='grid grid-cols-[0.5fr_1.5fr_1fr_1.5fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                  <img className='w-12 rounded-sm aspect-[1]' src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.album}</p>
                  <p>{item.artist.join(', ')}</p>
                  <p>{item.duration}</p>
                  <p className='cursor-pointer text-red-500 hover:text-red-700' onClick={()=>removeSong(item._id)}>X</p>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default ListSong
