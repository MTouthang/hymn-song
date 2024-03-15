import React from 'react';

const Lyric: React.FC = () => {
  const inputString =
    'Eisem’a Eihuhhingpau chu vahchoiyun, Lhan le thina konin eilhattauve ; A let Aloupi jabol’un vahchoiyun, Huhhing hat loupi chungnung tah ahi.';

  const formattedString = inputString.split(/[,;]/).join(',\n');

  console.log(formattedString);

  return (
    <>
      <div className="flex items-center justify-center mx-auto border-2 border-dark-500">
        <div className="items-center w-32 border-2 bg-dark-50">
          <ul>
            <li>1. fda...</li>
            <li>1. fda..</li>
            <li>1. fda...</li>
            <li>Home</li>
          </ul>
        </div>
        <div className="w-full mx-auto border-2 bg-dark-50">
          <p className="font-bold leading-10 md:text-6xl 2xl:text-8xl">
            {formattedString.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                <div className="h-10"> </div>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </>
  );
};

export default Lyric;
