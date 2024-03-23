import { createContext, useContext, useState } from 'react';
import { ILyric } from '../types';

const initialState: ILyric = {
  _id: '',
  hymnNumber: NaN,
  title: '',
  key: '',
  verses: [],
  composer: '',
  chorus: '',
};

interface ILyricContext {
  lyricData: ILyric;
  setLyricData: React.Dispatch<React.SetStateAction<ILyric>>;
}

const LyricContext = createContext<ILyricContext>({
  lyricData: initialState,
  setLyricData: () => {},
});

export const useLyricContext = () => useContext(LyricContext);

export const LyricContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lyricData, setLyricData] = useState<ILyric>(initialState);

  return (
    <LyricContext.Provider value={{ lyricData, setLyricData }}>
      {children}
    </LyricContext.Provider>
  );
};
