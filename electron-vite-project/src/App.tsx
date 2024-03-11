

import "./App.css";
import Tableau from "./components/tableau";
import { Button, TextField } from "@mui/material";

function App() {
  return (
    <div className="flex flex-col  items-center">
      <h1 className="text-green-500 text-3xl font-bold my-4">
        Liste des étudiants
      </h1>
      <Tableau />
      <TextField label="Requete" color="success" margin="normal" />
      <Button variant="contained" color="success">
        Success
      </Button>
    </div>
  );
}

export default App;
