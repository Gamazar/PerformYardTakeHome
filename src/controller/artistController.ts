import {Request, Response} from 'express';
import * as addArtistService from '../service/artistService';

export const search = (req: Request, res: Response): Response => {
    const querySearchString = req.query.search as string | undefined;
    if(!querySearchString) {
        return res.status(400).json({
            error: 'Search string is needed'
        });
    }

    const results = addArtistService.search(querySearchString);
    return res.json(results);
}
export const addArtist = (req: Request, res: Response): Response => {
    const {genre, artist } = req.body ?? {};
    if(!genre || genre.trim() === '') {
        return res.status(400).json({
            error: "Invalid genre, please check genre if empty"
        });
    }

    if(!artist || artist.trim() === '') {
        return res.status(400).json({
            error: "Invalid artist, please check artist name"
        })
    }
    addArtistService.addArtist(genre, artist);
    return res.status(204).send();
}