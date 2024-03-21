import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ILyric } from '../types';
import Lyric from './Lyric';

export const Title: React.FC = () => {
  const [startSlide, setStartSlide] = useState<boolean>(false);
  const [lyricData, setLyricData] = useState<ILyric | null>();

  useEffect(() => {
    // Get the stored lyric from local storage and parse it as ILyric
    const storedLyric: ILyric | null = JSON.parse(
      localStorage.getItem('lyric') || 'null'
    );
    setLyricData(storedLyric);
  }, [JSON.parse(localStorage.getItem('lyric') || 'null')]);

  return (
    <div className="container flex items-center h-screen mx-auto ">
      <div className="w-full mx-auto text-center bg-dark-50 ">
        <p
          onClick={() => setStartSlide(!startSlide)}
          className="py-2 text-sm font-bold cursor-pointer"
        >
          Slide-mode
        </p>

        {/* Render Lyric component if startSlide is true and lyricData is not null */}
        {startSlide && lyricData && <Lyric data={lyricData} />}

        {/* Render title if startSlide is false and lyricData is not null */}
        {!startSlide && lyricData && (
          <h1 className="font-bold text-center md:text-6xl 2xl:text-8xl">
            {lyricData.hymnNumber}. {lyricData.title?.toUpperCase()}
          </h1>
        )}

        {/* Back button using Link component */}
        <Link to="/" className="block py-4 mb-4 text-sm font-bold">
          Back
        </Link>
      </div>
    </div>
  );
};
