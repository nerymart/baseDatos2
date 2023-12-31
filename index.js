/* expres es una libreria */

const express = require("express");
const mysql = require("mysql2");
const app = express();

const pool = mysql.createPool({
  host: "gym-admin-db.mysql.database.azure.com",
  database: "gym_admin_db",
  user: "gym_admin1",
  password: "Administrador_1",
  connectionLimit: 10,
  port:"3306",
  ssl:true
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos exitosa.');

    // Realiza operaciones con la conexión aquí

    // Libera la conexión cuando hayas terminado de usarla
    connection.release();
  }
});

// Ejemplo de consulta
const sqlQuery = 'SELECT * FROM clientes';

connection.query(sqlQuery, (error, results, fields) => {
  if (error) {
    console.error('Error al realizar la consulta:', error);
  } else {
    console.log('Resultados de la consulta:', results);
  }

  // Libera la conexión cuando hayas terminado de usarla
  connection.release();
})

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function(req,res){
    res.render("layout");
});

app.get("/agregarCl", function(req,res){
    res.render("agregarCl");
});



app.get("/principal", function(req,res){
  res.render("principal");
});

app.get("/tipoMembresia", function(req,res){
  res.render("tipoMembresia");
});

app.get("/agreMenbresia", function(req,res){
  res.render("agreMenbresia");
});
app.get("/staff", function(req,res){
  res.render("staff");
});
app.get("/proveedor", function(req,res){
  res.render("proveedor");
});
app.get("/usuario", function(req,res){
  res.render("usuario");
});
app.get("/cargos", function(req,res){
  res.render("cargos");
});
app.get("/productos", function(req,res){
  res.render("productos");
});
app.get("/layout", function(req,res){
  res.render("layout");
});
app.get("/venta", function(req,res){
  res.render("venta");
});
app.get("/compra", function(req,res){
  res.render("compra");
});







/* /vali es el nombre q le asigne en el form y post sirve como un metodo*/
app.post("/vali", function (req,res){
  const datos = req.body;
  let usuario = datos.usuario;
  let contasena = datos.contrasena;

  let regis = "SELECT * FROM usuarios WHERE nombre_usuario='"+usuario+"' AND contrasena='"+contasena+"'";
  pool.query(regis, [usuario, contasena], function (error, results) {
    if (error) {
      throw error;
    } else {
      console.log(results); 
      if (results.length > 0) {
        res.render("principal");
      } else {
     
      }
    }
  });
  
});


/* este codigo va registrar los clientes a la base de datos*/

/*app.post("/agregar", function (req,res){
  const dato2 = req.body;
  let primerNombre = dato2.primerNombre;
  let segundoNombre = dato2.segundoNombre;
  let primerApellido = dato2.primerApellido;
  let segundoApellido = dato2.segundoApellido;
  let fechaNacimiento = dato2.fechaNacimiento;
  let cedula = dato2.cedula;
  let telefono = dato2.telefono;
  let sexo = dato2.sexo;
  let idMembresia = dato2.idMembresia;

  let regis = "INSERT INTO clientes (primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,fecha_nacimiento,cedula,telefono,sexo,id_membresia) VALUES ('"+primerNombre+"','"+segundoNombre+"','"+primerApellido+"','"+segundoApellido+"','"+fechaNacimiento+"','"+cedula+"','"+telefono+"','"+sexo+"','"+idMembresia+"')";
  pool.query(regis, [primerNombre,segundoNombre,primerApellido,segundoApellido,fechaNacimiento,cedula,telefono,sexo,idMembresia], function (error, results) {
    if (error) {
      throw error;
    } else {
      console.log("Listo"); 
      
    }
  });
  
});*/




app.post("/agregarC", function (req, res) {
  const dato2 = req.body;
  const { primerNombre, segundoNombre, primerApellido, segundoApellido, fechaNacimiento, cedula, telefono, sexo, estado } = dato2;

  const query = 'CALL AgregarCliente("'+primerNombre+'", "'+segundoNombre+'", "'+primerApellido+'", "'+segundoApellido+'", "'+fechaNacimiento+'", "'+cedula+'", "'+telefono+'", "'+sexo+'", "'+estado+'")';
  pool.query(query, [primerNombre, segundoNombre, primerApellido, segundoApellido, fechaNacimiento, cedula, telefono, sexo, estado], function (error, results) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al insertar en la base de datos.' });
    }

    console.log("Datos insertados correctamente.");
    
   
    res.redirect('/agregarCl');
  });
});



/*
app.listen(3306, function(){
    console.log("gym-admin-db.mysql.database.azure.com");
});*/

