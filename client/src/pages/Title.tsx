import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Lyric from './Lyric';
import { useLyricContext } from '../context/LyricContext';

export const Title: React.FC = () => {
  const [startSlide, setStartSlide] = useState<boolean>(false);
  const { lyricData } = useLyricContext();

  return (
    <div className="flex items-center justify-center w-full h-screen py-4 mx-auto ">
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
