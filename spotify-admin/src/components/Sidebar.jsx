import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='bg-[#000000e8] min-h-screen w-[18vw] px-6 pt-8 text-white shadow-md flex flex-col'>

      {/* Logo */}
      <div className='mb-10'>
        <img src={assets.logo} className='w-[max(8vw,100px)] hidden sm:block' alt='Logo' />
        <img src={assets.logo_small} className='w-[max(5vw,50px)] sm:hidden block' alt="Small Logo" />
      </div>

      {/* Sidebar Menu */}
      <nav className='flex flex-col gap-4'>

        <NavLink to='/add-song' className='sidebar-item'>
          <img src={assets.add_song} className='w-5' alt="Add Song" />
          <span>Add Song</span>
        </NavLink>

        <NavLink to='/list-song' className='sidebar-item'>
          <img src={assets.song_icon} className='w-5' alt="List Song" />
          <span>List Song</span>
        </NavLink>

        <NavLink to='/add-album' className='sidebar-item'>
          <img src={assets.add_album} className='w-5' alt="Add Album" />
          <span>Add Album</span>
        </NavLink>

        <NavLink to='/list-album' className='sidebar-item'>
          <img src={assets.album_icon} className='w-5' alt="List Album" />
          <span>List Album</span>
        </NavLink>

        <NavLink to='/add-artist' className='sidebar-item'>
          <img src={assets.add_album} className='w-5' alt="Add Artist" />
          <span>Add Artist</span>
        </NavLink>

        <NavLink to='/list-artist' className='sidebar-item'>
          <img src={assets.album_icon} className='w-5' alt="List Artist" />
          <span>List Artist</span>
        </NavLink>

      </nav>

    </div>
  );
};

export default Sidebar;
