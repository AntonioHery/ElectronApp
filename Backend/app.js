const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const { Pool } = require('pg');

//initialisation postgres
const pool = new Pool({
    user: 'postgress',
    host: 'localhost',
    database: 'Etudiant',
    password: 'antonio',
    port: 5432,
});

// Gérer les connexions socket
io.on('connection', (socket) => {
    console.log('Un client s\'est connecté');

    // Gérer les événements socket
    socket.on('sqlQuery', async (query) => {
        try {
            // Exécuter la requête SQL dans la base de données
            const result = await pool.query(query);
            // Envoyer les résultats à tous les clients connectés
            io.emit('sqlResult', result.rows);
        } catch (error) {
            console.error('Erreur lors de l\'exécution de la requête SQL:', error.message);
            // Envoyer un message d'erreur à l'utilisateur
            io.emit('sqlError', error.message);
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Serveur écoutant sur le port ${PORT}`);
});
