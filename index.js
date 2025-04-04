const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');  // Middleware para sobrescribir el método
const router = require('./src/routes/Router');
const pug = require('pug');
const path = require('path');
const axios = require('axios');  // Asegúrate de importar axios

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));  // Debe estar antes de las rutas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views'));

// Rutas
app.use('/api/libros', router);

// Iniciar el servidor
app.listen(port, () => {
    console.log("Aplicación iniciada en http://localhost:" + port + '/home');
});

app.get('/home', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/api/libros');
        const libros = response.data.data;
        console.log(libros);
        res.render('index', { title: "APILibros", message: "Libros", libros: libros });
    } catch (error) {
        console.error("Error al obtener los libros", error);
        res.render('index', { title: "APILibros", message: "Error al cargar los libros", libros: [] });
    }
});

app.get('/agregarLibro', (req, res) => {
  res.render('agregarLibro', { message: 'Añadir un libro nuevo' });
});

app.get('/editarLibro/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`http://localhost:3000/api/libros/${id}`);
    const libro = response.data.data[0];  // Obtener el primer resultado (solo un libro)
    res.render('editarLibro', { message: 'Edita un libro', libro: libro });
  } catch (error) {
    console.error("Error al obtener el libro", error);
    res.redirect('/home'); // Redirige al home en caso de error
  }
});

// Agregar un libro (POST)
app.post('/api/libros', (req, res) => {
  const { titulo, autor, descripcion } = req.body;

  if (titulo && autor && descripcion) {
    librosModel.agregarLibro(titulo, autor, descripcion, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.redirect('/home');
    });
  } else {
    res.status(400).json({ message: 'Faltan datos' });
  }
});

app.put('/api/libros/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, autor, descripcion } = req.body;

  if (id && titulo && autor && descripcion) {
    librosModel.editarLibro(id, titulo, autor, descripcion, (err, result) => {
      if (err) {
        res.status(404).json({ message: 'Libro no encontrado' });
        return;
      }
      // Redirige a la página de inicio después de editar el libro
      res.redirect('/home');
    });
  } else {
    res.status(400).json({ message: 'Faltan datos' });
  }
});

app.delete('/api/libros/:id', (req, res) => {
  const { id } = req.params;

  // Aquí iría la lógica para eliminar el libro de la base de datos
  librosModel.eliminarLibro(id, (err, result) => {
    if (err) {
      res.status(404).json({ message: 'Libro no encontrado' });
      return;
    }
    // Redirige a la página de inicio sin mensaje adicional
    res.redirect('/home');
  });
});
