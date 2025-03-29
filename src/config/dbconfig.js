const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'db_libros',
    port:3306
});

db.connect((err)=> {
    if(err){
        throw err;
    }

    console.log('Conectado a la base de datos');
})

module.exports = db