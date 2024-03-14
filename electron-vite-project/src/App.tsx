import "./App.css";
import React, { useState } from "react";
import Tableau from "./components/tableau";
import { Button, TextField } from "@mui/material";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Envoyer la requête SQL au serveur via des sockets
    socket.emit("sqlQuery", query);
  };

  // Écouter les événements 'sqlResult' et 'sqlError' du serveur
  socket.on("sqlResult", (data) => {
    setResult(data);
    console.log(data);
    setError("");
  });

  socket.on("sqlError", (errorMsg) => {
    setError(errorMsg);
    setResult("");
  });

  return (
    <div className="flex flex-col  items-center">
      <h1 className="text-green-500 text-3xl font-bold my-4">
        Liste des étudiants
      </h1>
      <Tableau />
      <form>
        <div className="flex items-center bg-red-500">
          <TextField
            label="Requete"
            color="success"
            margin="normal"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <p>Requete</p>
        </div>
        <div>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Envoyer requete
          </Button>
        </div>
      </form>
    </div>
  );
}

export default App;
