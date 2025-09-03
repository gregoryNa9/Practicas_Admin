const express = require("express");
const sequelize = require("./config/database");

const usuariosRoutes = require("./routes/usuarios.routes");
const invitacionesRoutes = require("./routes/invitaciones.routes");
const confirmacionesRoutes = require("./routes/confirmaciones.routes");
const metodosRoutes = require("./routes/metodos.routes");
const estadosRoutes = require("./routes/estados.routes");
const sectoresRoutes = require("./routes/sectores.routes");

const app = express();
app.use(express.json());

// Rutas
app.use("/usuarios", usuariosRoutes);
app.use("/invitaciones", invitacionesRoutes);
app.use("/confirmaciones", confirmacionesRoutes);
app.use("/metodos", metodosRoutes);
app.use("/estados", estadosRoutes);
app.use("/sectores", sectoresRoutes);

// Sincronizar modelos con DB
sequelize.sync()
    .then(() => console.log("Base de datos sincronizada"))
    .catch(err => console.error("Error DB:", err));

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
