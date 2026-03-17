import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import AddSong from './pages/AddSong';
import AddAlbum from './pages/AddAlbum';
import ListSong from './pages/ListSong';
import ListAlbum from './pages/ListAlbum';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AddArtist from './pages/AddArtist';
import ListArtist from './pages/ListArtist';

export const url = 'https://soultune.onrender.com'

const App = () => {
  return (
    <div className='flex items-start min-h-screen'>
      <ToastContainer />
      <Sidebar />

      <div className='flex-1 h-screen overflow-y-scroll bg-[#d0d4d28f]'>
      <Navbar />

        <div className='pt-8 pl-5 sm:pt-12 sm:pl-12'>
          <Routes>
            <Route path='/' element={<AddSong />} /> {/* Show AddSong by default */}
            <Route path='/add-song' element={<AddSong/>} />
            <Route path='/add-album' element={<AddAlbum/>} />
            <Route path='/list-song' element={<ListSong/>} />
            <Route path='/list-album' element={<ListAlbum/>} />
            <Route path='/add-artist' element={<AddArtist/>} />
            <Route path='/list-artist' element={<ListArtist/>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
