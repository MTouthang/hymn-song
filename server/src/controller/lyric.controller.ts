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

  // Check for duplicate verse numbers or same verse number
  const verseNumbers = verses.map((verse: { verseNumber: number }) => verse.verseNumber);
  const hasDuplicates = new Set(verseNumbers).size !== verseNumbers.length;
  if (hasDuplicates) {
      return next(new AppError("Duplicate verse numbers are not allowed", 400));
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
// TODO: Test me and add pagination
export const getAllLyrics = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  type searchType = {
    title?:object ,
    hymnNumber?: number
  }
  let lyrics 

  const searchQuery:searchType = {}

  const {title, hymnNumber} = req.query


  if(title){
   searchQuery.title = {$regex: title, $options: 'i'} 
  } else {
    searchQuery.hymnNumber = Number(hymnNumber)
  }

  lyrics = await Lyric.find(searchQuery)
  
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

  const {hymnNumber, title, key, verses, chorus, composer} = req.body
  const {lyricId} = req.params 

 // Fetch existing lyrics and check for duplicate verse numbers
 const existingLyrics = await Lyric.findById(lyricId);
 if (!existingLyrics) {
   return next(new AppError('Lyric not found', 404));
 }

 const newVerseNumbers = verses?.map((verse: { verseNumber: number }) => verse.verseNumber);
 const hasDuplicates = new Set(newVerseNumbers).size !== newVerseNumbers?.length;
 if (hasDuplicates) {
   return next(new AppError('Duplicate verse numbers are not allowed', 400));
 }

 // Prepare the updated lyric object
 const updatedLyric: ILyric = {
   hymnNumber: hymnNumber ?? existingLyrics.hymnNumber,
   title: title ?? existingLyrics.title,
   key: key ?? existingLyrics.key,
   verses: verses ?? existingLyrics.verses,
   chorus: chorus ?? existingLyrics.chorus,
   composer: composer ?? existingLyrics.composer
 };

 // Update the lyric in the database
 const updatedLyricData = await Lyric.findByIdAndUpdate(lyricId, updatedLyric, { new: true, omitUndefined: true });
 if (!updatedLyricData) {
   return next(new AppError('Lyric not able to update at the moment', 400));
 }

 // Respond with success message and updated lyric data
 res.status(200).json({
   success: true,
   message: 'Lyric data updated',
   updatedLyricData
 });
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

