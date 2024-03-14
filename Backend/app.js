const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

const { Pool } = require("pg");

//initialisation postgres
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Etudiant",
  password: "antonio",
  port: 5432,
});

// Gérer les connexions socket
io.on("connection", (socket) => {
  console.log("Un client s'est connecté");

  // Gérer les événements socket
  socket.on("sqlQuery", (query) => {
      // Exécuter la requête SQL dans la base de données
      const result = pool.query(query, (error, results) => {
        if (error) {
          console.error("Erreur lors de l'exécution de la requête:", error);
        } else {
          console.log("Résultats de la requête:", results.rows);

          // Envoyer les résultats à tous les clients connectés
          io.emit("sqlResult", result.rows);
        }
      });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Serveur écoutant sur le port ${PORT}`);
});
