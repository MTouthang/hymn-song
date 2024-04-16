import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { ILyricData } from '../types';

import { IData, IError } from '../types';
import { useLyricContext } from '../context/LyricContext';

import { handleErrorToast, handleSuccessToast } from '../helper/toastify';


const Home: React.FC = () => {
  const [data, setData] = useState<IData | undefined>();
  const [error, setError] = useState<IError | undefined>();
  const { setLyricData } = useLyricContext();

  const getLyricData = async () => {
    try {
      const res = await axios.get<IData>('http://localhost:8080/api/v1/lyric');

      setData(res.data);
    } catch (err) {
      const errorObject = err as AxiosError;
      setError({
        message: errorObject.message,
        code: errorObject.code,
      });
    }
  };

  const handleDataToLocalStorage = async (lyricId: string) => {
    try {
      const res = await axios.get<ILyricData>(
        `http://localhost:8080/api/v1/lyric/${lyricId}`
      );
      setLyricData({ ...res.data.lyric });
      // TODO: toast toggle error
      // handleSuccessToast('Hym data fetch successfully')

      
    } catch (err) {
      if(error instanceof AxiosError){
        handleErrorToast(error.response?.data.message)
      }
    }
  };

  useEffect(() => {
    getLyricData();
  }, []);

  return (
    <>
   
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
          <div className="flex flex-col w-5/6 ">
            <div>
              <div>
                {error ? (
                  <>
                    <p>Loading data error: {error.message}</p>
                  </>
                ) : data ? (
                  <ul className="space-y-2">
                    {data?.lyrics.map((item) => (
                      <li key={item._id} className="flex items-center ">
                        <span className="mr-2 text-gray-500">
                          {item.hymnNumber}.
                        </span>
                        <Link
                          onClick={() => handleDataToLocalStorage(item._id)}
                          to={`lyric/${item._id}`}
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
