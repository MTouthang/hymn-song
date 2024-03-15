import { ObjectId } from "mongoose"

/**
 * Type interface for Song model
 */
interface Verse {
  verseNumber: number
  lyrics: string
}

export interface ILyric {
  _id ?: ObjectId
  hymnNumber?: number
  title?: string 
  key?: string
  verses?: Verse []
  composer?: string
  chorus?: string
}

// lyric search type - 
export type searchType = {
  title?:object ,
  hymnNumber?: number,
  page?: number, 
  limit?: number
}

// next pagination interface 
interface paginationI {
  pageNumber?: number
  limit?: number
}

// previous pagination interface 
interface previousI {
  pageNumber?: number 
  limit?:number
}

// lyrics return object 
export type lyricResultI = {
  next?: paginationI
  previous?:previousI
  lyrics?: ILyric[]
}