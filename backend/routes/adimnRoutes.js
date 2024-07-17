import express from 'express';

import { getCallRequests, deleteCallRequest } from '../controllers/adminController.js';
import { getTrips, deleteTrip } from '../controllers/tripController.js';

const router = express.Router();


router.get('/getTrips', getTrips);
router.delete('/deleteTrip/:id', deleteTrip);


router.get('/getCallRequests', getCallRequests);
router.delete('/deleteCallRequest/:id', deleteCallRequest);


export default router;
