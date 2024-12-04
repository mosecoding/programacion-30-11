const http = require("http");
const mysql = require("mysql");
const fs = require("fs");
const path = require("path");

// Crear la conexión con la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "demo",
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error de conexión: " + err.stack);
    return;
  }
  console.log("Conectado a MySQL con ID: " + connection.threadId);
});

// Crear el servidor HTTP
http
  .createServer((req, res) => {
    // Servir el archivo HTML cuando accedan a la ruta "/"
    if (req.url === "/" && req.method === "GET") {
      fs.readFile(path.join(__dirname, "index.html"), "utf-8", (err, html) => {
        if (err) {
          res.statusCode = 500;
          res.end("Error al leer el archivo HTML");
          return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(html);
      });
    }
    // Ruta para crear un nuevo usuario
    else if (req.url === "/createUser" && req.method === "POST") {
      let body = "";

      // Obtener los datos del cuerpo de la solicitud
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const { nombre, apellido, sueldo } = JSON.parse(body);

        // Insertar el nuevo usuario en la base de datos
        connection.query(
          "INSERT INTO user (nombre, apellido, sueldo) VALUES (?, ?, ?)",
          [nombre, apellido, sueldo],
          (err, results) => {
            if (err) {
              res.statusCode = 500;
              res.end("Error al crear el usuario");
              return;
            }
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ message: "Usuario creado exitosamente" }));
          }
        );
      });
    } else {
      res.statusCode = 404;
      res.end("Ruta no encontrada");
    }
  })
  .listen(3000, () => {
    console.log("Servidor corriendo");
  });
