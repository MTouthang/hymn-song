
/**
 * Type interface for Song model
 */
interface Verse {
  verseNumber: number
  lyrics: string
}

export interface ISong {
  hymnNumber: number
  title: string 
  key: string
  verses: Verse []
  composer: string
  chorus: string
}