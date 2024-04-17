import axios, { AxiosResponse } from "axios";
import { IData, ILyricData } from "../types";
const endPoint: string = "https://hymn-song-services.onrender.com"

// get all the lyrics
// TODO: pagination pending 
export const fetLyrics = async(): Promise<IData | undefined> => {
    try {
        const response:AxiosResponse<IData> = await axios.get<IData>(`${endPoint}/api/v1/lyric`);
        return response.data
  
      } catch (error) {
        
        return Promise.reject(error)
      }
}

// get a particular lyric by providing the ID
export const getParticularLyric = async(id:string): Promise<ILyricData> => {
    try {
        const res = await axios.get<ILyricData>(`https://hymn-song-services.onrender.com/api/v1/lyric/${id}`);
        console.log(res)
        return res.data

    } catch (error) {
        return Promise.reject(error);
    }
  };

