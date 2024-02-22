import mongoose, { InferSchemaType, model } from 'mongoose'
import { ILyric } from 'types'

const lyricSchema = new mongoose.Schema <ILyric> ({
  hymnNumber: {
    type: Number,
    required: [true, "Hymn number should be provided"],
    unique: true
  },
  title: {
    type: String,
    required: [true, 'Song title is required'],
    minlength: [5, 'Name must be at-least 5 characters long'],
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  key: {
    type: String,
    minlength: [3, 'Name must be at-least 5 characters long'],
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  verses:[
    {
      verseNumber:{
        type: Number,
        required: [true, "Verse number is required!"]
      },
      
        lyrics: {
          type: String,
          required: [true, "verse lyric is required!"]
        }
    },
    
  ],
  chorus: {
    type: String, 
    required: [true, "chorus is required"]

  },
  composer: {
    type: String,
    minlength: [5, 'Composer name must be at-least 5 characters long'],
    maxlength: [30, 'Composer name cannot be more than 50 characters'],
  }

})

type lyricSchema = InferSchemaType<typeof lyricSchema>

const lyric = model<lyricSchema>('Lyric', lyricSchema)
export default lyric