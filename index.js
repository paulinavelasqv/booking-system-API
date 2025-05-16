const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const setupSwagger = require("./swagger");

console.log("API NODEJS BOOKING_SYSTEM");

dotenv.config();

// Conexión a la BD
connection();

const app = express();

setupSwagger(app);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const AuthRoutes = require("./routes/authRoute");
const UserRoutes = require("./routes/userRoute");
const AppointmentRoutes = require("./routes/appointmentRoute");
const AdminRoutes = require("./routes/adminRoute");

app.use("/api/auth", AuthRoutes);
app.use("/users", UserRoutes);
app.use("/appointments", AppointmentRoutes);
app.use("/admin", AdminRoutes);


// Iniciar servidor
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});