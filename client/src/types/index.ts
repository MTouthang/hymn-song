
// lyrics dat 
export interface Verse {
  verseNumber: number
  lyrics: string
}

export interface ILyric {
  _id: string
  hymnNumber: number    
  title: string 
  key: string
  verses: Verse []
  composer: string
  chorus: string
}

export interface IData {
  success: boolean,
  message: string,
  lyrics: ILyric[]
}

// Error data 
export interface IError {
  message: string;
  code?: string
}

// lyric 
export interface ILyricData {
  success: boolean, 
  message: string,
  lyric: ILyric
}