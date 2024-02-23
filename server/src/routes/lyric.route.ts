import { Router } from 'express';
import { createLyric, deleteLyric, getAllLyrics } from '../controller/lyric.controller';


const lyricRoutes = Router();


lyricRoutes.route('/').post(createLyric).get(getAllLyrics)
lyricRoutes.delete('/:lyricId', deleteLyric)


export default lyricRoutes;