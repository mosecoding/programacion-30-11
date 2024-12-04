# Aplicación para agregar usuarios

Este archivo explica cómo agregar usuarios a nuestra base de datos a través de un formulario`.

## Requisitos

- **Node.js**: Puedes verificarlo con el siguiente comando:

  ```bash
  node -v
  ```

## Archivos del Proyecto

1. `index.html` - HTML de la aplicación.
2. `db.js` - Archivo Javscript con la conexión y servidor http.

## 1. `index.html`

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Crear Nuevo Usuario</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-100 flex justify-center items-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-3xl font-semibold text-center mb-6 text-gray-700">
        Crear Nuevo Usuario
      </h1>

      <form id="createUserForm" class="space-y-4">
        <div>
          <label for="nombre" class="block text-gray-700 font-medium"
            >Nombre:</label
          >
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label for="apellido" class="block text-gray-700 font-medium"
            >Apellido:</label
          >
          <input
            type="text"
            id="apellido"
            name="apellido"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label for="sueldo" class="block text-gray-700 font-medium"
            >Sueldo:</label
          >
          <input
            type="number"
            id="sueldo"
            name="sueldo"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Crear Usuario
          </button>
        </div>
      </form>
    </div>

    <script>
      // Llamada para enviar los datos del formulario a Node.js
      document
        .getElementById("createUserForm")
        .addEventListener("submit", function (event) {
          event.preventDefault();

          const nombre = document.getElementById("nombre").value;
          const apellido = document.getElementById("apellido").value;
          const sueldo = document.getElementById("sueldo").value;

          fetch("/createUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre, apellido, sueldo }),
          })
            .then((response) => response.json())
            .then((data) => {
              alert("Usuario creado exitosamente");
              // Limpiar el formulario después de la creación
              document.getElementById("createUserForm").reset();
            })
            .catch((error) =>
              console.error("Error al crear el usuario:", error)
            );
        });
    </script>
  </body>
</html>
```

## 2. `db.js`

```javascript
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
```
