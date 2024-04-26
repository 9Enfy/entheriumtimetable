import React from "react";
import { Typography,Data } from "@mui/material";
import OrarioGiorno from "./components/OrarioGiorno";

const test=[
    {id:1,materia:"italiano",aula:"A",oraInizio:"19.30",oraFine:"21.30"},
    {id:2,materia:"matematica",aula:"B",oraInizio:"9.30",oraFine:"00.30"},
]
const App = () =>{
    localStorage.setItem("test",test);
    return(
        <OrarioGiorno rowsDaInserire={test} />
    )
}
export default App;
