const express = require('express')
const bodyParser = require('body-parser');
const router = require('./src/routes/Router');
const pug = require('pug');
const path = require('path');
const axios = require('axios');


const app = express();
const port = 3000;


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','pug');
app.set('views',path.join(__dirname,'src/views'));

//Rutas
app.use('/api/libros',router);


//Iniciar el servidor

app.listen(port,()=>{
    console.log("Aplicacion iniciado en http://localhost:"+port+'/home')
})

app.get('/home', async (req,res)=>{
    try{
        const response = await axios.get('http://localhost:3000/api/libros');
        const libros = response.data.data;
        console.log(libros)
        res.render('index',{title:"APILibros",message:"Libros",libros:libros});
    }catch(error){
        console.error("Error al obtener los libros",error);
        res.render('index', { title: "APILibros", message: "Error al cargar los libros", libros: [] });
    }
});
app.get('/agregarLibro', (req, res) => {
  res.render('agregarLibro', { message: 'Añadir un libro nuevo' });
});

app.post('/api/libros',(req,res) =>{
  const {titulo,autor,descripcion}=req.body;
  console.log>("Datos recibidos",req.body);

  if(titulo && autor && descripcion){
    librosModel.agregarLibro(titulo,autor,descripcion,(err,result) =>{
      if(err){
        res.status(500).json({error:err.message});
        return;
      }
      res.redirect('/home');
    });
  }else{
    res.status(400).json({message:"Faltan datos"});
  }
});
