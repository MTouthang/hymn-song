import {Request, Response, NextFunction } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware"
import Lyric from "../models/lyric.model";
import { ILyric } from "types";
import AppError from "../utils/appErr.utils";
import lyric from "../models/lyric.model";

/**
 *
 * @createLyric
 * @desc   create lyric details
 * @ROUTE  POST {{URL}}/api/v1/lyric
 * @return created lyric data with success status and message
 * @ACCESS Public 
 *
 */
export const createLyric = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { hymnNumber, title, key, verses, chorus, composer } = req.body;

  // Check if any required fields are missing
  const requiredFields = ['hymnNumber', 'title','verses'];
  if (requiredFields.some(field => !req.body[field])) {
   return next(new AppError('Missing required fields', 400)) 
  }

  // Check if the hymn lyric already exists
  const existingLyric = await Lyric.findOne({ hymnNumber });
  if (existingLyric) {
    return next(new AppError('The hymn lyric already exists in the database', 409)) 
  }

  // Create a new lyric instance
  const newLyric = new Lyric({
    hymnNumber,
    title,
    key,
    verses,
    chorus,
    composer
  });

  // Save the new lyric to the database
  const savedLyric = await newLyric.save();
  if (!savedLyric) {
   return next(new AppError('Failed to save hymn lyric data', 500))
  }

  // Respond with success message and saved lyric data
  res.status(201).json({
    success: true,
    message: 'Hymn lyric saved successfully',
    lyricData: savedLyric
  });
});

/**
 *
 * @getAllLyrics
 * @desc   get all lyrics
 * @ROUTE  GET {{URL}}/api/v1/lyric
 * @return all lyric data with success status and message
 * @ACCESS Public 
 *
 */

export const getAllLyrics = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const lyrics = await Lyric.find()
  
  if(!lyrics){
    return next(new AppError("Not able to fetch lyric at the moment!", 500))
  }

  res.status(200).json({
    success: true, 
    message: "All lyrics fetch successfully",
    lyrics
  })
})

/**
 *
 * @deleteLyric
 * @desc   delete the hymn lyric with the provided ID
 * @ROUTE  Delete {{URL}}/api/v1/lyric
 * @return deleted data with success status and message
 * @ACCESS Public 
 *
 */

export const deleteLyric = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  const {lyricId} = req.params 

  const lyric = await Lyric.findById(lyricId)

  if(!lyric){
    return next(new AppError("Lyric data is not available for the provided lyric ID", 400))
  }

  const data = await Lyric.findByIdAndDelete(lyricId)

  return res.status(200).json({
    success: true, 
    message: "Lyric data deleted successfully",
    data
  })
})

/**
 *
 * @updateLyric
 * @desc   update the lyric 
 * @ROUTE  Delete {{URL}}/api/v1/lyric/:lyricId
 * @return updated lyric data with success status and message
 * @ACCESS Public 
 *
 */
export const updateLyric = asyncHandler (async (req: Request, res: Response, next: NextFunction)  => {

  const {lyricId} = req.params 

  const updateLyric = await Lyric.findByIdAndUpdate(
    lyricId, 
    req.body, {new: true, omitUndefined: true}
  )

  if(!updateLyric){
    return next(new AppError("Lyric not able to update at the moment", 400))
  }

 return res.status(200).json({
  success: true,
  message: "lyric data updated", 
  updateLyric
 })
})

/**
 *
 * @getLyricById
 * @desc   get a particular lyric by id
 * @ROUTE  get {{URL}}/api/v1/lyric/:lyricId
 * @return particular lyric data with success status and message
 * @ACCESS Public 
 *
 */
export const getLyricById = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  const {lyricId} = req.params 
  const lyric  = await Lyric.findById(lyricId)

  if(!lyric){
    return next(new AppError("lyric not found with the provided data", 400))
  }

  return res.status(200).json({
    success: true, 
    message: "Lyric fetch successfully", 
    lyric
  })
})