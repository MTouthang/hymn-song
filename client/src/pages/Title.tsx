import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ILyricData } from '../types';
import axios from 'axios';

export const Title: React.FC = () => {
  const { lyricId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<ILyricData | undefined>();

  const getLyricDataById = async () => {
    try {
      const res = await axios.get<ILyricData>(
        `http://localhost:8080/api/v1/lyric/${lyricId}`
      );
      setData(res.data);
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    getLyricDataById();
  }, [lyricId]);

  console.log(data);
  return (
    <div className="container flex items-center h-screen mx-auto ">
      <div className="w-full mx-auto text-center border-2 bg-dark-50">
        <p className="font-bold text-center md:text-6xl 2xl:text-8xl">
          <Link to={'/lyric/slide'}>
            {data?.lyric.hymnNumber}. {data?.lyric.title}
          </Link>
        </p>
        {/* Back button using Link component */}
        <Link to="/" className="block py-4 mb-4 text-sm font-bold">
          Back
        </Link>
      </div>
    </div>
  );
};
