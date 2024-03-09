import { apiConnector } from "../apiConnector";
import { lobbyEndpoints } from "../apis";
import{toast} from "react-hot-toast";

var header = {
  "X-RapidAPI-Key": `${import.meta.env.VITE_RAPID_API_KEY}`,
  "X-RapidAPI-Host": `${import.meta.env.VITE_RAPID_API_HOST}`,
};
export async function searchSongs(query) {
  try {
    const toastId = toast.loading("Searching Songs...");
    const result = await apiConnector(
      "GET",
      `https://spotify81.p.rapidapi.com/search?q=${query}&type=multi&offset=0&limit=10&numberOfTopResults=5`,
      null,
      header,
      null
    );
    toast.dismiss(toastId);
    return result.data.tracks;
  } catch (err) {
    console.log(err);
  }
}

export async function getSongURL(song) {
  try {
    //check if db has song url
    const toastId = toast.loading("Adding song...");
    console.log("GET SONG URL DATA: ", song);
    const dbCheckResult = await apiConnector(
      "PUT",
      `${lobbyEndpoints.GET_SONG}${song.songId}`,
      song,
      null,
      null
    );
    console.log("DB CHECK RESPONSE: ", dbCheckResult);
    if (dbCheckResult.status === 200){ toast.dismiss(toastId);return dbCheckResult.data.data};

    //if not then call the api
    const result = await apiConnector(
      "GET",
      `https://spotify81.p.rapidapi.com/download_track?q=${song.songId}&onlyLinks=1`,
      null,
      header,
      null
    );
    console.log("SONG URL RESPONSE: ", result);
    // if (result.status === 200) {
    //   song.songUrl = result.data[0];
    // }
    song.songUrl = result.data[0].url;
    //api call to db add song
    const addSongResult = await apiConnector(
      "POST",
      `${lobbyEndpoints.ADD_SONG}`,
      song,
      null,
      null
    );
    console.log("ADD SONG RESPONSE: ", addSongResult);
    toast.dismiss(toastId);
    return addSongResult.data.data.newSong;
  } catch (err) {
    console.log(err);
  }
}
