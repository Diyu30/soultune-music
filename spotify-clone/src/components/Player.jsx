import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const Player = () => {

    const {seekBar, seekBg, playStatus, play, pause, track, time, previous, next, seekSong, volume, setVolume} = useContext(PlayerContext);

    const [isMuted, setIsMuted] = useState(false);

    // Handle Volume Change
    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        setIsMuted(newVolume == 0);
    };

    // Mute/Unmute Feature
    const toggleMute = () => {
        if (isMuted) {
            setVolume(50); // Restore to default volume (50%)
            setIsMuted(false);
        } else {
            setVolume(0);
            setIsMuted(true);
        }
    };

  return track ? (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
        <div className='hidden lg:flex items-center gap-4'>
            <img className='w-12 rounded-sm' src={track.image} alt="" />
            <div>
                <p>{track.name}</p>
                <p>{track.artist.join(', ')}</p>
            </div>
        </div>
        <div className='flex flex-col items-center gap-1 m-auto'>
            <div className='flex gap-4'>
                <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="" />
                <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="" />
                {playStatus
                ? <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="" />
                : <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="" /> 
                }
                <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt="" />
                <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="" />
            </div>
            <div className='flex items-center gap-5'>
                <p>{time.currentTime.minute}:{time.currentTime.second}</p>
                <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-400 rounded-full cursor-pointer'>
                    <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full'/>
                </div>
                <p>{time.totalTime.minute}:{time.totalTime.second}</p>
            </div>
        </div>
        <div className='hidden lg:flex items-center gap-2 opacity-75'>
            <img className='w-4' src={assets.speaker_icon} alt="" />
            
            {/* Mute/Unmute Button */}
            <img onClick={toggleMute} className="w-4 cursor-pointer" src={assets.volume_icon} alt="Volume Icon" />

            {/* Volume Slider */}
            <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 cursor-pointer appearance-none bg-gray-400 h-1 rounded"
                style={{
                    background: `linear-gradient(to right, #007bff ${volume}%, #ccc ${volume}%)`
                }}
            />

            {/* Show Volume Percentage */}
            <p className="text-white text-sm">{volume}%</p>

            <img className='w-4' src={assets.mini_player_icon} alt="" />
            <img className='w-4' src={assets.zoom_icon} alt="" />
        </div>
    </div>
  ) : null
}

export default Player
