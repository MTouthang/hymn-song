import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';


import { IData } from '../types';
import { useLyricContext } from '../context/LyricContext';

import { handleErrorToast } from '../helper/taoster';
import { fetLyrics, getParticularLyric } from '../helper/api';


const Home: React.FC = () => {
  const [data, setData] = useState<IData | undefined>();
  const [error, setError] = useState<string | undefined>();
  const { setLyricData } = useLyricContext();
  

  const [isLoading, setIsLoading] = useState<boolean>(true); // State to track loading state

  useEffect (() => {
    const fetchData = async () => {

      try {
         const data = await fetLyrics(); // Call the fetchLyrics function to fetch data
         setData(data)
         setIsLoading(false)
      } catch (error) {
        setError("Error fetching lyrics."); // Set error message
        setIsLoading(false); // Set loading state to false
      }
    }
    fetchData()

     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  
  // In your component where you want to call getParticularLyric:
const handleGetParticularLyric = async (id:string) => {
 
  try {
    const lyricData = await getParticularLyric(id);
    console.log(lyricData);

    setLyricData({ ...lyricData.lyric });
    
  } catch (error) {
    if (error instanceof AxiosError) {
      handleErrorToast(error.response?.data.message);
    }
  }
};



  return (
    <>
      {isLoading}
      <section className="text-gray-600 body-font">
        <div className="flex flex-col items-center justify-center px-5 py-24 mx-auto ">
          <div className="flex items-end justify-center w-full">
            <div className="relative w-2/4 mr-4 text-left lg:w-full xl:w-1/2 md:w-full">
              <input
                type="text"
                id="hero-field"
                name="hero-field"
                className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500"
                placeholder="Number, Title ..."
              />
            </div>
            <button className="inline-flex px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
              Search
            </button>
          </div>

          {/* HOUBUNG LA */}
          <h2 className="py-5"> HOUBUNG LA </h2>
          <div className="flex flex-col w-5/6 bg-top bg-no-repeat bg-opacity-200 bg-hero-bg-image"
           
          >
            <div>
              <div>
                {error ? (
                  <>
                    <p>Loading data error: {error}</p>
                  </>
                ) : data ? (
                  <ul className="space-y-2">
                    {data?.lyrics.map((item) => (
                      <li key={item._id} className="flex items-center ">
                        <span className="mr-2 text-gray-500">
                          {item.hymnNumber}.
                        </span>
                        <Link
                          to={`lyric/${item._id}`}
                          onClick={() => 
                          
                            handleGetParticularLyric(item._id)}
                          
                        >
                          {' '}
                          {item.title.toUpperCase()}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p> Loading data...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
