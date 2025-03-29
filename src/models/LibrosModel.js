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
    const sql = "INSERT INTO libros(titulo,autor,descripcion) VALUES(?,?,?)";
    db.query(sql, [titulo, autor, descripcion], callback, (err, result) => {
      if (err) {
        return callback(err, null);
      }

      callback(null, result.insertedId);
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
