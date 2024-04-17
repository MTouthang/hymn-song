import React, { useState } from 'react';

import { ILyric } from '../types';
import { useLyricContext } from '../context/LyricContext';

interface LyricProps {
  data: ILyric ; // Explicitly type the data prop
}
const Lyric: React.FC<LyricProps> = ({ data }) => {
  const [slide, setSlide] = useState<string>(data.verses[0].lyrics);

  const { lyricData } = useLyricContext();

  const handleSlide = (item: string) => {
    setSlide(item);
  };

  return (
    <>
      <div className="flex items-center w-full py-10 mx-auto 2xl:w-5/6 border-dark-100 ">
        <div className="items-center justify-center w-32 2xl:w-40 bg-dark-50 ">
          <ul className="items-center text-left">
            {lyricData.verses.map((item) => (
              <li 
                className='text-gray-400 hover:cursor-pointer hover:text-gray-700'
                key={item.verseNumber}
                onClick={() => handleSlide(item.lyrics)}
              >
                {item.verseNumber}. {item.lyrics.slice(0, 10)}...
              </li>
            ))}
            {data?.chorus &&   <li onClick={() => setSlide(data.chorus)}
            
            className='cursor-pointer'>chorus</li>}
          </ul>
        </div>
        <div className="w-full mx-auto text-center ">
          <p className="font-bold text-left md:text-6xl 2xl:text-7xl">
            {slide.split(/[,;]/).map((item, index) => (
              <div className="leading-normal" key={index}>
                {item}
                <br />
              </div>
            ))}
          </p>
        </div>
      </div>
    </>
  );
};

export default Lyric;
