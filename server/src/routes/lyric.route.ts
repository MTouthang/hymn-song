import { Router } from 'express';
import { createLyric } from '../controller/lyric.controller';


const lyricRoutes = Router();


lyricRoutes.route('/').post(createLyric); 

export default lyricRoutes;