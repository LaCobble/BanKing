const mongoose = require('mongoose');

// Définition du schéma pour le modèle "users"
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Champ requis
    },
    email: {
        type: String,
        required: true // Champ requis
    },
    contact: {
        type: Number,
        required: true // Champ requis
    },
    amount: {
        type: Number,
        required: true // Champ requis
    }
});

// Création du modèle "users" basé sur le schéma
const users = mongoose.model('user', UserSchema);

module.exports = users; // Exporte le modèle "users" pour une utilisation dans d'autres fichiers
