const db = require("../config/dbconfig");

class LibrosModel {
  getLibros(callback) {
    const sql = "SELECT * FROM libros";
    db.query(sql, callback);
  }

  getLibrosById(id, callback) {
    const sql = "SELECT * FROM libros WHERE id=?";
    db.query(sql, [id], callback);
  }

  agregarLibro(titulo, autor, descripcion, callback) {
    const sql = "INSERT INTO libros(titulo, autor, descripcion) VALUES(?, ?, ?)";
    db.query(sql, [titulo, autor, descripcion], (err, result) => {
      if (err) {
        return callback(err, null); // En caso de error, devuelve el error como primer parámetro
      }
      callback(null, result.insertId);  // Aquí usamos `insertId` correctamente
    });
  }

  updateLibro(id, titulo, autor, descripcion, callback) {
    const sql = "UPDATE libros SET titulo=?,autor=?,descripcion=? WHERE id=?";
    db.query(sql, [titulo, autor, descripcion,id], callback);

  }

  deleteLibro(id, callback) {
    const sql = "DELETE FROM libros WHERE id=?";
    db.query(sql, [id], callback);
  }
}

module.exports = new LibrosModel();
