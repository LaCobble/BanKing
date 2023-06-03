const mongoose = require('mongoose');

// Définition du schéma pour le modèle "history"
const historySchema = new mongoose.Schema({
    sName: {
        type: String,
        require: true // Champ requis
    },
    sEmail: {
        type: String,
        require: true // Champ requis
    },
    rName: {
        type: String,
        require: true // Champ requis
    },
    rEmail: {
        type: String,
        require: true // Champ requis
    },
    amount: {
        type: Number,
        require: true // Champ requis
    },
    date: {
        type: Date,
        default: Date.now // Valeur par défaut : date actuelle
    }
});

// Création du modèle "history" basé sur le schéma
const historyModel = mongoose.model('history', historySchema);

module.exports = historyModel; // Exporte le modèle "history" pour une utilisation dans d'autres fichiers
