import mongoose, { InferSchemaType, model } from 'mongoose'
import { ISong } from 'types'

const songSchema = new mongoose.Schema <ISong> ({
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
  composer: {
    type: String,
    minlength: [5, 'Composer name must be at-least 5 characters long'],
    maxlength: [30, 'Composer name cannot be more than 50 characters'],
  }

})

type songSchema = InferSchemaType<typeof songSchema>

const Song = model<songSchema>('Song', songSchema)
export default Song