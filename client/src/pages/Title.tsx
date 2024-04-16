import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Lyric from './Lyric';
import { useLyricContext } from '../context/LyricContext';

export const Title: React.FC = () => {
  const [startSlide, setStartSlide] = useState<boolean>(false);
  const { lyricData } = useLyricContext();

 
  
  

  return (
    <div className="flex items-center justify-center w-full h-screen py-4 mx-auto ">
      <div className="flex flex-col items-center py-4">
       
        <svg className='cursor-pointer hover:border hover:shadow-2xl ' onClick={() => setStartSlide(!startSlide)} width="25" height="24" viewBox="0 0 25 24" fill="#" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.07843 5.65257C5.07843 4.22644 6.60743 3.32239 7.85703 4.00967L19.3976 10.357C20.6928 11.0694 20.6928 12.9304 19.3976 13.6428L7.85703 19.9901C6.60743 20.6774 5.07843 19.7733 5.07843 18.3472V5.65257Z" fill="#0F172A"/>
          {/* TODO: full screen pending */}
          <title> Full Screen or Exit </title>
        </svg>

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
          <svg className='hover:border hover:shadow-2xl ' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.4697 3.84101C11.7626 3.54811 12.2374 3.54811 12.5303 3.84101L21.2197 12.5303C21.5126 12.8232 21.9874 12.8232 22.2803 12.5303C22.5732 12.2375 22.5732 11.7626 22.2803 11.4697L13.591 2.78035C12.7123 1.90167 11.2877 1.90167 10.409 2.78035L1.71967 11.4697C1.42678 11.7626 1.42678 12.2375 1.71967 12.5303C2.01256 12.8232 2.48744 12.8232 2.78033 12.5303L11.4697 3.84101Z" fill="#0F172A"/>
            <path d="M12 5.432L20.159 13.591C20.1887 13.6207 20.2191 13.6494 20.25 13.6772V19.875C20.25 20.9105 19.4105 21.75 18.375 21.75H15C14.5858 21.75 14.25 21.4142 14.25 21V16.5C14.25 16.0858 13.9142 15.75 13.5 15.75H10.5C10.0858 15.75 9.75 16.0858 9.75 16.5V21C9.75 21.4142 9.41421 21.75 9 21.75H5.625C4.58947 21.75 3.75 20.9106 3.75 19.875V13.6772C3.78093 13.6494 3.81127 13.6207 3.84099 13.591L12 5.432Z" fill="#0F172A"/>
            <title> Home </title>
          </svg>
        </Link>
      </div>
    </div>
  );
};
