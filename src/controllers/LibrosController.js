const librosModel = require('../models/LibrosModel');

module.exports = {
    getLibros: (req, res) => {
        librosModel.getLibros((err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ data: result });
        });
    },

    getLibroById: (req, res) => {
        const { id } = req.params;
        console.log("ID recibido", id);
        if (!id) {
            return res.status(400).json({ error: 'El ID es requerido' });
        }
        librosModel.getLibrosById(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            if (result.length === 0) {
                res.status(404).json({ message: "Libro no encontrado" });
            }

            res.status(200).json({ data: result });
        });
    },

    agregarLibro: (req, res) => {
        const { titulo, autor, descripcion } = req.body;

        librosModel.agregarLibro(titulo, autor, descripcion, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            // Redirige al home después de agregar el libro
            res.redirect('/home'); // Redirigir a la página de inicio después de agregar el libro
        });
    },

    editarLibro:(req,res)=>{
      const {id} = req.params;
      const{titulo, autor, descripcion} = req.body;
      librosModel.updateLibro(id,titulo, autor, descripcion, (err,result)=>{
        if(err){
          res.status(500).json({error:err.message})
          return
        }
        if(result.affectedRows==0){
          res.status(404).json({message:"Libro no encontrado"})
          return;
        }
        res.status(200).json({message:'Libro modificado correctamente',data: {idInsertado:result}})
      });
    },
    deleteLibro: (req, res) => {
        const { id } = req.params;

        librosModel.deleteLibro(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                res.status(404).json({ message: "Libro no encontrado" });
                return;
            }

            res.status(200).json({ message: "Libro eliminado" });
        })
    }
  }
