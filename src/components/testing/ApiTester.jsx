import {useState} from 'react';
import { searchSongs, getSongURL } from '../../services/apis/songs';
import {useSelector, useDispatch} from 'react-redux';
import { addSongToQueue } from '../../slices/songQueue';

const ApiTester = () => {
    const [searchSong, setSearchSong] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const song = useSelector(state => state.songQueue);
    const dispatch = useDispatch();

    console.log(song.queue);

    
    //Handler for searching the song
    const handleSearch = async() => {
        const result = await searchSongs(searchSong);
        setSearchResults(result);
    }

    //handler for adding the song to the queue
    const handleClickOnSong = async(id) => {
      const result = await getSongURL(id);
      console.log(result);
    }
    

    

  return (
    <div className=' relative flex flex-col justify-center items-center'>
      
      <h1 className='text-3xl text-white uppercase font-Bangers'>Search for a song</h1>
      <div>
        <input 
          type = "text" 
          placeholder='Search here....' 
          value={searchSong} 
          onChange={(e) => setSearchSong(e.target.value)} 
          className='px-4 py-2 rounded-l-full text-gray-300 border-l-2 border-t-2 border-b-2 border-[#811B60] bg-[#311225]'
        />
        <button 
          onClick={handleSearch} 
          className='px-4 py-2 bg-[#311225] text-gray-300 border-r-2 border-t-2 border-b-2 border-[#811B60] rounded-r-full transition-all duration-200 hover:bg-[#811B60]'
        >Search</button>
      </div>

      {
        searchResults.length !=0 && (
          <div className='bg-[#411831] p-4 flex flex-col gap-1 rounded-xl'>
            {
              searchResults.map((song)=>(
                <div key={song.data.id} onClick={()=>handleClickOnSong(song.data.id)} className='flex gap-3 transition-all duration-150 hover:bg-[#811B60] p-1 rounded-md cursor-pointer'>
                  <div>
                    <img src = {song.data.albumOfTrack.coverArt.sources[0].url} alt={`cover at of ${song.data.name}`} className='w-[30px] h-[30px] rounded'/> 
                  </div>
                  <div>
                    <h1 className='text-white text-sm'>{song.data.name}</h1>
                    <p className='text-gray-400 text-xs'>{song.data.artists.items[0].profile.name}</p>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }

      { (
        <audio src={song.queue[0]?.url} autoPlay controls key={song.queue[0]?.url}/>
      )}
      
    </div>
  )
}

export default ApiTester
