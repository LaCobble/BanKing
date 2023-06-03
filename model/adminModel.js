const mongoose = require('mongoose');

// Définition du schéma pour le modèle "admin"
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true // Champ requis
    },
    password: {
        type: String,
        required: true // Champ requis
    }
});

// Création du modèle "admin" basé sur le schéma
const admin = mongoose.model('admin', AdminSchema);

module.exports = admin; // Exporte le modèle "admin" pour une utilisation dans d'autres fichiers
