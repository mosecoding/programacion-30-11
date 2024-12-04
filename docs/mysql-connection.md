# Conexión a MySQL desde Node.js

Este archivo explica cómo conectar una base de datos MySQL con Node.js, utilizando el paquete `mysql`.

## Requisitos

- **Node.js**: Puedes verificarlo con el siguiente comando:

  ```bash
  node -v
  ```

## Código

```javascript
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
```
