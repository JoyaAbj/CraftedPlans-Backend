const express = require('express');
const router = express.Router();
const plannersControllers = require('../controllers/plannersController');
// const { authenticated } = require('../middleware/auth.js');

router.post('/addPlanner', plannersControllers.addPlanner);
router.get('/getPlannerById/:Id', plannersControllers.getPlannerById);
router.get('/getAll', plannersControllers.getAllPlanners);
router.post('/getPlannerByCover', plannersControllers.getPlannerByCover);
// router.put('/updatePlanner/:Id', plannersControllers.updatePlanner);
router.delete('/deletePlanner/:Id', plannersControllers.deletePlanner);


module.exports = router;
