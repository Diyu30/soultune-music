import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistItem = ({ image, name, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/artist/${id}`)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img
        src={image}
        alt={name}
        className="w-[175px] h-[161px] rounded-full mx-auto object-cover"
      />
      <p className="mt-2 text-sm font-semibold flex items-center justify-center">{name}</p>
    </div>
  );
};

export default ArtistItem;
