import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const url = 'https://soultune.onrender.com';

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [artistsData, setArtistsData] = useState([]); // New artist state

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState ({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const [volume, setVolume] = useState(50); // Default volume at 50%
    
    const [likedSongs, setLikedSongs] = useState(() => {
        const storedLikes = localStorage.getItem("likedSongs");
        return storedLikes ? JSON.parse(storedLikes) : {};
      });
          
      useEffect(() => {
        localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
      }, [likedSongs]);
    
      const toggleLike = (song) => {
        setLikedSongs((prev) => {
          const updatedLikedSongs = { ...prev };
      
          if (updatedLikedSongs[song._id]) {
            console.log(`Unliking: ${song.name}`);
            delete updatedLikedSongs[song._id]; // Unlike
          } else {
            console.log(`Liking: ${song.name}`);
            updatedLikedSongs[song._id] = song; // Like
          }
      
          console.log("Updated likedSongs:", updatedLikedSongs);
          return updatedLikedSongs;
        });
      };
      
    
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100; // Convert 0-100 to 0-1 scale
        }
    }, [volume]); // Update volume whenever it changes
    
    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }
    
    const playWithId = async (id) => {
        await songsData.map ((item) => {
            if (id === item._id) {
                setTrack(item);
            }
        });

        await audioRef.current.play();
        setPlayStatus(true);
    }

    const previous = async () => {
        songsData.map(async (item, index) => {
            if (track._id === item._id && index > 0) {
                await setTrack (songsData[index-1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }

    // const next = async () => {
    //     const currentIndex = songsData.findIndex((item) => item._id === track._id);
    //     if (currentIndex !== -1 && currentIndex < songsData.length - 1) {
    //         setTrack(songsData[currentIndex + 1]);
    //         await audioRef.current.play();
    //         setPlayStatus(true);
    //     }
    // };    

    const next = async () => {
        const currentIndex = songsData.findIndex((item) => item._id === track._id);
        if (currentIndex !== -1 && currentIndex < songsData.length - 1) {
            const newTrack = songsData[currentIndex + 1];
            setTrack(newTrack);
    
            // Wait for the track state to update before playing
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.load(); // Reload audio source
                    audioRef.current.play(); // Start playing the new track
                    setPlayStatus(true);
                }
            }, 100); // Small delay to ensure track update
        }
    };    

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`)
            setSongsData(response.data.songs);
            setTrack(response.data.songs[0]);

        } catch (error) {
            console.error("Error fetching songs:", error); // Log the error
        }
    }

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`)
            setAlbumsData(response.data.albums);

        } catch (error) {
            console.error("Error fetching songs:", error); // Log the error
        }
    }

    const getArtistsData = async () => {  // Fetch artists
        try {
            const response = await axios.get(`${url}/api/artist/list`);
            setArtistsData(response.data.artists);
        } catch (error) {
            console.error("Error fetching artists:", error);
        }
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         audioRef.current.ontimeupdate = () => {
    //             seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
    //             setTime ({
    //                 currentTime: {
    //                     second: Math.floor(audioRef.current.currentTime % 60),
    //                     minute: Math.floor(audioRef.current.currentTime / 60)
    //                 },
    //                 totalTime: {
    //                     second: Math.floor(audioRef.current.duration % 60),
    //                     minute: Math.floor(audioRef.current.duration / 60)
    //                 }
    //             })
    //         }
    //     }, 1000);
    // }, [audioRef])

    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current; // Store reference for cleanup
    
            audio.ontimeupdate = () => {
                if (audio.duration) { // Ensure duration is available
                    seekBar.current.style.width = (Math.floor(audio.currentTime / audio.duration * 100)) + "%";
                    setTime({
                        currentTime: {
                            second: Math.floor(audio.currentTime % 60),
                            minute: Math.floor(audio.currentTime / 60),
                        },
                        totalTime: {
                            second: Math.floor(audio.duration % 60),
                            minute: Math.floor(audio.duration / 60),
                        },
                    });
                }
            };
    
            audio.onended = () => {
                next();
            };
    
            // Cleanup function to remove old event listeners
            return () => {
                audio.ontimeupdate = null;
                audio.onended = null;
            };
        }
    }, [track]); // Re-run effect when track changes    

    useEffect (() => {
        getSongsData();
        getAlbumsData();
        getArtistsData(); // Fetch artists data on load
    }, []);

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong,
        songsData, albumsData, artistsData,
        volume, setVolume,
        likedSongs, toggleLike
    }  

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )

}

export default PlayerContextProvider;