import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ILyric } from '../types';

interface LyricProps {
  data: ILyric; // Explicitly type the data prop
}
const Lyric: React.FC<LyricProps> = ({ data }) => {
  const [slide, setSlide] = useState<string>(data.verses[0].lyrics);

  // const inputString =
  //   'Eisem’a Eihuhhingpau chu vahchoiyun, Lhan le thina konin eilhattauve ; A let Aloupi jabol’un vahchoiyun, Huhhing hat loupi chungnung tah ahi.';

  // const formattedString = inputString.split(/[,;]/).join(',\n');

  const handleSlide = (item: string) => {
    setSlide(item);
  };
  console.log(data);

  return (
    <>
      <div className="flex items-center mx-auto border-2 border-dark-500">
        <div className="w-32 bg-dark-50">
          <ul className="justify-start text-left">
            {data.verses.map((item) => (
              <li
                key={item.verseNumber}
                onClick={() => handleSlide(item.lyrics)}
              >
                {item.verseNumber}. {item.lyrics.slice(0, 10)}...
              </li>
            ))}
            <li onClick={() => setSlide(data.chorus)}>chorus</li>
            <Link to={'/'}> Home</Link>
          </ul>
        </div>
        <div className="w-full mx-auto border-2 bg-dark-50">
          <p className="font-bold leading-10 md:text-6xl 2xl:text-8xl">
            {slide}
          </p>
        </div>
      </div>
    </>
  );
};

export default Lyric;
