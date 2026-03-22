'use strict';

import {search, addArtist } from "../controller/artistController";

const {Router} = require('express');

const router = Router();

router.post('/artists', addArtist);
router.get('/search', search);
export default router;