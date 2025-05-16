
# Sistema de Reservas (Turnos/Citas)

API backend para un sistema de reservas con autenticación, administración de disponibilidad y gestión de citas.

---

## Tecnologías

- Node.js  
- Express  
- MongoDB (Mongoose)  
- JWT para autenticación  
- Swagger para documentación API  

---

## Funcionalidades principales

- Registro y login de usuarios (con roles `user` y `admin`).  
- Crear, ver y cancelar citas (usuarios).  
- Gestión de bloques de disponibilidad (admin).  
- Validaciones: no agendar en horarios ocupados o fuera de disponibilidad.  
- Panel admin para ver todas las citas y manejar disponibilidad.  
- Documentación API con Swagger.  

---

## Instalación

1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/sistema-reservas.git
cd sistema-reservas
```

2. Instala dependencias

```bash
npm install
```

3. Crea un archivo `.env` con las variables necesarias

Ejemplo mínimo:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sistema-reservas
JWT_SECRET=tu_secreto_jwt
```

4. Corre la aplicación

```bash
npm start
```

---

## Uso

- La API corre en `http://localhost:3000`  
- Documentación Swagger disponible en `http://localhost:3000/api-docs`  

---

## Endpoints principales

### Autenticación

- `POST /auth/register` — Registro de usuario  
- `POST /auth/login` — Login de usuario  

### Usuarios

- `GET /users/me` — Ver perfil  

### Citas (Usuarios)

- `POST /appointments` — Crear cita  
- `GET /appointments/me` — Ver mis citas  
- `DELETE /appointments/:id` — Cancelar cita  

### Admin

- `GET /admin/appointments` — Ver todas las citas  
- `POST /admin/availability` — Crear bloques de disponibilidad  
- `GET /admin/availability` — Ver bloques de disponibilidad  
- `DELETE /admin/availability/:id` — Eliminar bloque de disponibilidad  

---

## Notas

- Para rutas protegidas se usa autenticación JWT con bearer token.  
- Por defecto los usuarios se registran con rol `user`.  
- Solo usuarios con rol `admin` pueden acceder a las rutas administrativas.  
- Para registrar un usuario como admin, debes modificar manualmente el rol en la base de datos o implementar un endpoint seguro para hacerlo.  

---

## Contribuciones

Pull requests y sugerencias son bienvenidas.

---

## Licencia

MIT License.
