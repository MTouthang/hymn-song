import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ILyric } from '../types';
import Lyric from './Lyric';

export const Title: React.FC = () => {
  const [startSlide, setStartSlide] = useState<boolean>(false);

  // Get the stored lyric from local storage and parse it as ILyric
  const storedLyric: ILyric | null = JSON.parse(
    localStorage.getItem('lyric') || 'null'
  );

  console.log(startSlide);

  return (
    <div className="container flex items-center h-screen mx-auto ">
      <div className="w-full mx-auto text-center bg-dark-50 ">
        <p
          onClick={() => setStartSlide(!startSlide)}
          className="py-2 text-sm font-bold cursor-pointer"
        >
          Slide-mode
        </p>

        {startSlide ? (
          <Lyric />
        ) : (
          <h1 className="font-bold text-center md:text-6xl 2xl:text-8xl">
            {storedLyric?.hymnNumber}. {storedLyric?.title.toUpperCase()}
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
