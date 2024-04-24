import './App.css';
import { useState } from 'react';
import { Contract, Web3 } from 'web3';
import orarioFactoryContractJson from './abi/orarioFactory.json';

import Start from './components/start.js';
import End from './components/end.js';
import Desc from './components/desc.js';
import Aula from './components/aula.js';
import Day from './components/day.js';
import AddressViewer from './components/addressViewer.js';


const web3 = new Web3("HTTP://127.0.0.1:7545");

function ConvertHourToNumber(hour)
{
  if(hour === undefined)
  {
    return -1;
  }
  let dividedhour = hour.split(":"); 
  return Number(dividedhour[0])*60+Number(dividedhour[1]);
}

function App() {
  let userAccount; 

  const [connectedAccount, setConnectedAccount] = useState('null');
  const ConnectMetamask = async event => {
    event.preventDefault();
    
    //check metamask is installed
    if (window.ethereum) {
      // instantiate Web3 with the injected provider
      const web3 = new Web3(window.ethereum);

      //request user to connect accounts (Metamask will prompt)
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      //get the connected accounts
      const accounts = await web3.eth.getAccounts();

      //show the first connected account in the react page
      setConnectedAccount(accounts[0]);
    } else {
      alert('Please download metamask');
    }
  }


  const SeeBlockChain = event => {
    event.preventDefault();
    _SeeBlockChain();
    
  }
  async function _SeeBlockChain():Promise<void>
  {
    try
    {
      const orarioFactoryContractABI = orarioFactoryContractJson.abi;
    //localStorage.clear();
    let myForm = document.getElementById('myForm');
    let address = myForm['addressViewer'].value;
    console.log("See blockchain inizio: ",address);
    let factoryContract = new web3.eth.Contract(orarioFactoryContractABI,"0x3a91F39bcD894dDFbBE1B80e1934fAe3d32D82D4");
    let orario =factoryContract.methods.getOrario(address).call();
    console.log("Orario: ",orario);
    }
  catch(err)
  {
    console.log(err);
  }
}


  
  const salvataggioLocaleDati = event => {
    event.preventDefault();
    

    let myForm = document.getElementById('myForm');
    let start = myForm['start'].value;
    let end = myForm['end'].value;
    let desc = myForm['desc'].value;
    let aula = myForm['aula'].value;
    let day = myForm['day'].value;

    //controlla se l'orario inserito è compatibile con se stesso
    if(ConvertHourToNumber(start)>ConvertHourToNumber(end))
    {
      //non è compatibile, messaggio errore
      console.log("L'orario di inizio non può essere dopo l'orario di fine");

    }

    let finalOutput = Array(7);
    if(localStorage.getItem("orarioCache")===null)
    {
      for(let i = 0;i<7;i++)
      finalOutput[i]="";
    }
    else
    {
      finalOutput = localStorage.getItem("orarioCache").split(";");
    }
      


    let stringaOrarioGiorno = finalOutput[day];
    let giorniSingoli = stringaOrarioGiorno.split(",");
    //in posizione 0 c'è ora inizio, in posizione 1 c'è ora fine, in posizione 2 c'è desc, in posizione 3 c'è aula
    let oraInizioOrari = Array();
    let oraFineOrari = Array();
    for(let i=0;i<giorniSingoli.length;i++)
    {
      let tmp = giorniSingoli[i].split("-");
      oraInizioOrari[i] = ConvertHourToNumber(tmp[0]);
      oraFineOrari[i] = ConvertHourToNumber(tmp[1]);
    }
    let oraInizioOrarioDaInserire = ConvertHourToNumber(start);
    let oraFineOrarioDaInserire = ConvertHourToNumber(end);
    //trova la posizione in cui il nuovo orario dovrebbe essere inserito
    let indice = -1;
    let trovato = false;
    //console.log("Comparazione per decidere posizione",oraFineOrarioDaInserire,oraInizioOrari[0]);
    if(oraFineOrari[0]==-1)//e il primo elemento di tutti
    {
      indice=0;
      trovato=true;
    }else
    if(oraFineOrarioDaInserire<=oraInizioOrari[0])//e il primo elemento
    {
      console.log("entra in primo elemento indice");
      indice=0;
      trovato = true;
    }
    else if(oraInizioOrarioDaInserire>=oraFineOrari[oraFineOrari.length-2])//e l'ultimo elemento
    {
      console.log("entra in ultimo elemento indice");
      indice=oraFineOrari.length;
      trovato=true;
    }
    else
    {
      indice=1;
      console.log("entra in elemento in mezzo indice");
      while(indice<oraFineOrari.length-1)
      {
        console.log("oraInizioOrarioDaInserire: ",oraInizioOrarioDaInserire,"oraFineOrari[indice-1]: ",oraFineOrari[indice-1],"oraFineOrarioDaInserire: ",oraFineOrarioDaInserire,
        "oraInizioOrari[indice]: ",oraInizioOrari[indice])
        if(oraInizioOrarioDaInserire>=oraFineOrari[indice-1] && oraFineOrarioDaInserire<=oraInizioOrari[indice])
        {
          trovato=true;
          indice++;
          break;
        }
        indice = indice +1;
      }
    }
    let res = start+"-"+end+"-"+desc+"-"+aula;
    if(!trovato)
    {
      console.log("IMPOSSIBILE TROVARE POSIZIONE IN CUI INSERIRE ORARIO");
    }
    else
    {
      console.log("nuovo orario deve essere inserito in posizione:",indice);
      if(indice==0)
      {
        giorniSingoli.unshift(res);
      }
      else
      {
        giorniSingoli.splice(indice-1,0,res);
      }
      
    }
   console.log("Giorni singoli dopo aver inserito il nuovo orario",giorniSingoli);
   finalOutput[day] = giorniSingoli.join(",");
   console.log("Final output alla fine: ",finalOutput);
   localStorage.setItem("orarioCache",finalOutput.join(";"));

    
  }

  const salvataggioBlockChainDati = event =>{
    event.preventDefault();
    _salvataggioBlockChainDati();
    
  }
  async function  _salvataggioBlockChainDati()
  {
    try
    {
      const orarioFactoryContractABI = orarioFactoryContractJson.abi;
    let stringOutput = localStorage.getItem("orarioCache");
    console.log("salvataggioblock-finaloutput-1 = ",stringOutput);
    
    let factoryContract = new web3.eth.Contract(orarioFactoryContractABI,"0x3a91F39bcD894dDFbBE1B80e1934fAe3d32D82D4");
    factoryContract.methods.createOrarioDocente().send({from: connectedAccount});
    console.log("salvataggioblock-finaloutput-2 = ",stringOutput);
    factoryContract.methods.modifyOrarioDocente("'"+stringOutput+"\0'").send({from:connectedAccount}).then(console.log);
    }
    catch(err)
    {
      console.log(err);
    }
    
  }
  function resetDati()
  {
    localStorage.clear();
  }

  return (
    <div className="App">
      <form id='myForm' >
        <label>Ora inizio-fine: </label>
        <Start />
        <End />
        <br />
        <label>Evento: </label>
        <Desc />
        <br /><br />
        <label>Aula: </label>
        <Aula />
        <br /><br />
        <label>Giorno: </label>
        <Day />
        <br /><br />
        <button type='submit' id='aggiungi' onClick={salvataggioLocaleDati}>Aggiungi</button>
        <button id='reset' onClick={resetDati}>Reset</button>
        <br /><br />
        <button type='submit' id='invio' onClick={salvataggioBlockChainDati}>Invia</button>
        <button type='submit' id='metamask' onClick={ConnectMetamask}>Connect To Metamask</button>
        <h2>{connectedAccount}</h2>
        <AddressViewer />
        <button onClick={SeeBlockChain}>Visualizza orario di un indirizzo</button>
      </form>
       
    </div>
  );
}

export default App;


/*

LUNEDI:
8:30,10:30 italiano aulaa
11:30,14.30....

MARTEDI:

MERCOLEDI:

.......
*/
