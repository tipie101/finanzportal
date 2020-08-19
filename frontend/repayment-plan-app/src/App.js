import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RepaymentForm from './RepaymentForm';

function App() {
  return (
    <div className="App">

        <div class="header">
          <h2>
          RECHNER FÜR DEN DARLEHENS-TILGUNGSPLAN
          </h2>
        </div>  

        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-8">
            <RepaymentForm />
          </div>
          <div class="col-sm-2"></div>
        </div>
    </div>
    
  );
}

export default App;
