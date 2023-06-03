const mongoose = require('mongoose');

// Fonction de connexion à la base de données
const conn = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("DATABASE CONNECTED"); // Affiche un message de confirmation si la connexion à la base de données est réussie
    }).catch((err) => {
        console.log(err); // Affiche les erreurs de connexion à la base de données
    });
};

module.exports = conn; // Exporte la fonction de connexion pour une utilisation dans d'autres fichiers
