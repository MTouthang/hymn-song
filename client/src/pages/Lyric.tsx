import React, { useState, useEffect } from 'react';

import { ILyric } from '../types';
import { useLyricContext } from '../context/LyricContext';

interface LyricProps {
  data: ILyric ; // Explicitly type the data prop
}
const Lyric: React.FC<LyricProps> = ({ data }) => {
  const { lyricData } = useLyricContext();
  const [slide, setSlide] = useState<string>(lyricData.verses[0]?.lyrics || '');
  const [index, setIndex] = useState<number>(0);

 
  //  key stroke for up and down
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          if (index > 0) {
            setIndex((prevIndex) => prevIndex - 1);
          }
          break;
        case 'ArrowDown':
          if (index < lyricData.verses.length - 1) {
            setIndex((prevIndex) => prevIndex + 1);
          }
          break;
        
        case "ArrowLeft":
          if(lyricData.chorus) {
            setSlide(data.chorus)
          }
          break
        
        case "ArrowRight":
          if(lyricData.chorus) {
            setSlide(data.chorus)
          }
          break

        default:
          break;
      }
    };

    // Attach event listener when component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Clean up by removing event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, lyricData.verses.length]); // Re-run effect when index or verse length changes

  // Update slide (lyrics) when index changes
  useEffect(() => {
    setSlide(lyricData.verses[index]?.lyrics || '');
  }, [index, lyricData.verses]);

  const handleSlide = (index:number) => {
    setIndex(index)
    
  }

  return (
    <div>
      <div className="flex items-center w-full mx-auto border-dark-100 ">
       
        <div className="items-center justify-center w-32 2xl:w-40 bg-dark-50 ">
      
          <ul className="items-center text-left">
            {lyricData.verses.map((item, index) => (
              <li 
                className='text-gray-400 hover:cursor-pointer hover:text-gray-700'
                key={item.verseNumber}
                onClick={() => {
                  handleSlide( index)
                }}
              >
                {item.verseNumber}. {item.lyrics.slice(0, 10)}...
              </li>
            ))}
            {data?.chorus &&   <li onClick={() => setSlide(data.chorus)}
            
            className='cursor-pointer'>chorus</li>}
          </ul>
        </div>
        <div className="w-[1100px] xl:w-[1600px] text-center h-min-[600px] flex justify-center items-center px-8 shadow-2xl py-10 border">
          <p className="w-full font-bold text-left md:text-5xl 2xl:text-7xl">
            {slide.split(/[,;]/).map((item, index) => (
              <div className="w-full py-2" key={index}>
                {item}
                <br />
              </div>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Lyric;
