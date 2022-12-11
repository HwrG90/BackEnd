# CoderHouse

*BackEnd*

> This is a project for the course of BackEnd from the CoderHouse.

---

# Documentación

Todo es por via POSTMAN
Se Necesita un Token Para acceder algunas Rutas
El Token se genera Luego de Iniciar sesión

## Rutas

| Método | Endpoint | Descripción |
| ------ | ------ | ------------|
| POST | /login | Inicio de sesión de usuarios se les dará un Token para que puedan Acceder a las demás rutas
| POST | /register | Registro de usuarios se almacena en MongoDB
| GET | /User | Envía a ver la información del usuario que se registro / Se necesita Token
| GET | /api/productos | Me permite listar todos los productos disponibles
| POST | /api/productos | Para incorporar productos al listado / Se necesita Token
| GET | /api/productos/:id | Permite ver un producto especifico dando en ID / Se necesita Token
| PUT | /api/productos/:id | Permite Editar el producto Seleccionado por ID / Se necesita Token
| DELETE | /api/productos/:id | Permite Eliminar un Producto seleccionado por ID / Se necesita Token
| POST | /api/carrito | Me permite crear un carrito / Se necesita Token
| GET | /api/carrito/:id/productos | Me permite ver el carrito seleccionado por ID y sus productos / Se necesita Token
| POST | /api/carrito/:idCar/:idProd | Me permite ver el carrito seleccionado por ID y el producto seleccionado por ID / Se necesita Token
| DELETE | 	/api/carrito/id | Me permite eliminar un carrito seleccionado por ID / Se necesita Token
| DELETE | /api/carrito/:id/productos/:idProd | Me permite eliminar un producto seleccionado por ID del carrito seleccionado por ID / Se necesita Token
| GET | /api/test/info | Muestra información relativa a la app
