const { conection } = require("./database/conection");
const express = require("express");
const cors = require("cors");

/* Inicializar app */
console.log("App de node arrancada");

/* Conectar a la base de datos */
conection();

/* Crear servidor Node */
const app = express();
const puerto = 3900;

/* Configurar cors */
app.use(cors());

/* Convertir body a objeto js */
app.use(express.json()); // recibir datos con content-type app/json
app.use(express.urlencoded({extended: true})); // form-urlencoded

/* Crear rutas */
const router_article = require("./routes/article");

/* Cargar rutas */
app.use("/api", router_article);

/* Crear servidor y escuchar peticiones http */
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto: " + puerto);
});