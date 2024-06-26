import axios, { AxiosResponse } from "axios";
import { IData, ILyricData, ILyricFormData } from "../types";

// dev env and production env
const endPoint: string | undefined = import.meta.env.VITE_ENDPOINT_DEV || import.meta.env.VITE_ENPOINT_PROD

console.log(import.meta.env.VITE_ENDPOINT_DEV)
console.log(import.meta.env.VITE_ENPOINT_PROD)

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
        const res = await axios.get<ILyricData>(`${endPoint}/api/v1/lyric/${id}`);
        console.log(res)
        return res.data

    } catch (error) {
        return Promise.reject(error);
    }
  };

  // add or post lyric from 
  export const AddLyric = async(lyric:ILyricFormData) => {
    try {
    
      const response: AxiosResponse<ILyricFormData> =
        await axios.post<ILyricFormData>(
          `${endPoint}/api/v1/lyric/`,
          lyric
        );
        return response
     
      }
     catch (error) {
      
        return Promise.reject(error)
  }
  }



