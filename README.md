# Diseño de ingenieria
Por Joe Cordero
![](https://private-user-images.githubusercontent.com/120497590/320658097-caa9bbdb-3472-408a-9c8b-7103e6f4f7c3.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTI2MTM4ODgsIm5iZiI6MTcxMjYxMzU4OCwicGF0aCI6Ii8xMjA0OTc1OTAvMzIwNjU4MDk3LWNhYTliYmRiLTM0NzItNDA4YS05YzhiLTcxMDNlNmY0ZjdjMy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDA4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQwOFQyMTU5NDhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zMWM0ZDhjYWEyNWMyMDRjYmE3MGZlZTZhYzkxZmM0ZTQxNTk0MDkwZDg5YWQxMTRiNDJkMjUzMTVhNmNiNjU1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.-xdVhLlam-me8DQX9kFJ6-pSSoscqOyeZkXVZm2PRzo)

El flujo de login en en mi peoyecto MVC con Node.js, Express.js, MongoDB y React funciona de la siguiente manera: Cuando un usuario desea iniciar sesión, interactúa con la interfaz de inicio de sesión proporcionada por la aplicación React (Login.js). Al enviar sus credenciales, la información se transmite desde el cliente React a través de una solicitud HTTP POST hacia el servidor Express.js que está ejecutando la API Rest. Este servidor maneja la solicitud en UsuariosController.js, donde las credenciales enviadas son comparadas con los datos almacenados en la base de datos MongoDB. Si las credenciales son correctas, se genera un token JWT que el servidor envía de vuelta al cliente como parte de la respuesta a la solicitud de inicio de sesión.

Una vez que el cliente React recibe el token JWT del servidor, procede a almacenar este token en el Local Storage del navegador para mantener la sesión del usuario. Este token servirá para futuras solicitudes a rutas protegidas, permitiendo que solo los usuarios autenticados puedan acceder a ellas. Con el token almacenado, el usuario puede realizar operaciones CRUD en la sección de administración de clientes, siempre y cuando incluya el token en los headers de autorización para las solicitudes que realice a la API. Esto asegura que el acceso a la funcionalidad de administración esté restringido a usuarios con credenciales válidas.

# Links del proyecto deployado:
  Backend en vercel: https://vercel-rest-crud.vercel.app
	Frontend en Netlify: https://dashing-strudel-b16274.netlify.app/
  Usuario: mateo@gmail.com
  contraseña: 123123
