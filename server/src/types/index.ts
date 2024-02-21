
/**
 * Type interface for Song model
 */
interface Verse {
  verseNumber: number
  lyrics: string
}

export interface ISong {
  title: string 
  key: string
  verses: Verse []
  composer: string
}