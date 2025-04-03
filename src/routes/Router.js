const express = require('express');
const router = express.Router();
const librosController = require('../controllers/LibrosController');

// Obtener todos los libros
router.get('/', librosController.getLibros);

// Obtener libro por id
router.get('/:id', librosController.getLibroById);

// Agregar un libro
router.post('/', librosController.agregarLibro);

// Editar libro
router.put('/:id', librosController.editarLibro);

// Eliminar libro
router.delete('/:id', librosController.deleteLibro);

module.exports = router;
