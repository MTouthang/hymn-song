import {Request, Response, NextFunction } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware"
import Lyric from "../models/lyric.model";
import { ILyric } from "types";
import AppError from "../utils/appErr.utils";

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
  const requiredFields = ['hymnNumber', 'title','verses', 'chorus'];
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