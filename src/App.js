import logo from './logo.svg';
import './App.css';
import ThesaursService from './thesarusService';


function App() {
  return (
    <div className="App">
      <header className="App-header p-5">
        <img src={logo} className="App-logo" alt="logo" /> 
        <h1>Thesaurus</h1>
        <h5>Your own personal knowledge tool to IMPRESS your friends</h5>
      </header>  
      <main>
        <ThesaursService />        
      </main>    
    </div>
  );
}

export default App;

