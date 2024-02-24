import { Router } from 'express';
import { createLyric, deleteLyric, getAllLyrics, getLyricById, updateLyric } from '../controller/lyric.controller';


const lyricRoutes = Router();


lyricRoutes.route('/').post(createLyric).get(getAllLyrics)
lyricRoutes.delete('/:lyricId', deleteLyric)
lyricRoutes.put('/:lyricId', updateLyric)
lyricRoutes.get("/:lyricId", getLyricById)


export default lyricRoutes;