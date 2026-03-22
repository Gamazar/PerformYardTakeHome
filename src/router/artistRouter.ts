'use strict';

import { addArtist } from "../controller/artistController";

const {Router} = require('express');

const router = Router();

router.post('/artists', addArtist);

export default router;