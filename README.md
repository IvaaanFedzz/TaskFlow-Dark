Lo primero que necesitamos es instalar  Node.js instalado en nuestro sistema.
Vamos a esta pagina nodejs.org y lo descargamos la ultima version en TLS.

<img width="1719" height="990" alt="image" src="https://github.com/user-attachments/assets/1e84949e-0d04-40cc-a27f-725f60dd4ef1" />

Luego de eso instalamos  MongoDB Local: mongodb.com/docs/manual/installation

<img width="1719" height="985" alt="image" src="https://github.com/user-attachments/assets/65935d2e-10b5-453d-9948-f4fcd28d7ae6" />



Luego abrir una terminal y ver si lo hemos instalado correctamente con 2 comandos sencillos:
node  -v
npm -v

Crear backend con Express + Mongoose

npm install express mongoose cors dotenv
---------------------------------------
npm install --save-dev nodemon concurrently

Y creamos el .env  con la URL de Mongo atlas o local ( atlas en nuestro caso)

Ahi como veis en los archivos os he puesto uno de ejemplo para ver la url que os tiene que devolver
y la cambiariamos por la nuestra y el puerto si deseamos o si estamos trabajando con ese puerto ya.

Crear frontend con React (Vite)
----------
npm create vite@latest frontend -- --template react
cd frontend
npm install
----------
Ejecutar todo junto
Vuelve a la raíz y agrega scripts en package.json:
"scripts": {
  "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
  "dev:backend": "nodemon backend/index.js",
  "dev:frontend": "cd frontend && npm run dev"
}


Y ejecutamos npm run dev en backend y en frontend ( cd backend , cd frontend los dos npm run dev)
Abrir React (http://localhost:5173)
Ver los mensajes desde MongoDB
Agregar nuevos mensajes que se guardan en la base de datos



Y de ahi quedaria nuestra backend y frontend lista!

<img width="1719" height="988" alt="Captura de pantalla 2025-11-03 200826" src="https://github.com/user-attachments/assets/7462df82-3e93-425f-8ed0-848dbf80dcce" />

