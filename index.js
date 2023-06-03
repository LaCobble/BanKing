require('dotenv').config(); // Charge les variables d'environnement depuis un fichier .env

const express = require('express');
const app = express(); // Initialise une nouvelle instance de l'application Express

const bodyParser = require('body-parser'); // Middleware pour parser les données de requête HTTP
const database = require('./database/db'); // Importe le module de connexion à la base de données
const session = require('express-session'); // Middleware pour gérer les sessions utilisateur
const { log } = require('console');
const http = require('http').createServer(app); // Crée un serveur HTTP basé sur l'application Express
const io = require('socket.io')(http); // Initialise Socket.IO pour la communication en temps réel

const PORT = process.env.PORT || 5000; // Définit le port d'écoute du serveur, utilise une valeur par défaut si PORT n'est pas défini dans les variables d'environnement

app.use(bodyParser.urlencoded({extended: false})); // Utilise le middleware bodyParser pour parser les données de requête en URL-encoded
app.use(bodyParser.json()); // Utilise le middleware bodyParser pour parser les données de requête en JSON

app.use(express.static('public')); // Définit le dossier "public" comme étant le répertoire statique pour servir les fichiers du côté client
app.use(require('./router/index')); // Utilise le routeur défini dans le fichier "index.js" pour gérer les routes de l'application
app.set("view engine", "ejs"); // Définit EJS comme moteur de template par défaut pour générer les vues dynamiques

database(); // Appelle la fonction d'initialisation de la base de données pour établir une connexion

io.on('connection', (socket) => {
  // Gère les événements de connexion des clients Socket.IO
  // console.log('a user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    // Gère l'événement de déconnexion des clients Socket.IO
    // console.log('user disconnected');
  });
});

http.listen(PORT, () => {
  console.log(`The server is listening on the port : ${PORT}`);
});
