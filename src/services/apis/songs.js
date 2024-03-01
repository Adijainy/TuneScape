import { apiConnector } from "../apiConnector";

var header = {
   "X-RapidAPI-Key": `${import.meta.env.VITE_RAPID_API_KEY}`,
   "X-RapidAPI-Host": `${import.meta.env.VITE_RAPID_API_HOST}`,
};
export async function searchSongs(query){
   try{
      const result = await apiConnector("GET", `https://spotify81.p.rapidapi.com/search?q=${query}&type=multi&offset=0&limit=10&numberOfTopResults=5`,null,
      header, null);
      return result.data.tracks;
   }
   catch(err){
      console.log(err);
   }
}

export async function getSongURL(song_id){
   try{
      const result = await apiConnector("GET",`https://spotify81.p.rapidapi.com/download_track?q=${song_id}&onlyLinks=1`,null, header, null);
      return result.data[0];
   }catch(err){
      console.log(err);
   }
}