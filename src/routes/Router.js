const express = require('express')
const router = express.Router();
const librosController = require('../controllers/LibrosController');

router.get('/',librosController.getLibros)
router.get('/:id',librosController.getLibroById);
router.post('/',librosController.agregarLibro)
router.put('/:id',librosController.editarLibro);
router.delete('/:id',librosController.deleteLibro);



module.exports=router;