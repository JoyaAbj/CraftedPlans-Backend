const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const templatesControllers = require('../controllers/templatesControllers');
// const { authenticated } = require('../middleware/auth.js');

router.post('/addTemplate', upload.array('images'), templatesControllers.addTemplate);
router.get('/getTemplateById/:Id', templatesControllers.getTemplateById);
router.get('/getAll', templatesControllers.getAllTemplates);
router.post('/getTemplateByCategory', templatesControllers.getTemplateByCategory);
router.post('/getTemplateByName', templatesControllers.getTemplateByName);
router.put('/updateTemplate/:Id', upload.array('images'), templatesControllers.updateTemplate);
router.delete('/deleteTemplate/:Id', templatesControllers.deleteTemplate);


module.exports = router;
