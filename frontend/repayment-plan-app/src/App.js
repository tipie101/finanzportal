import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RepaymentForm from './RepaymentForm';
import RepaymentPlanTable from './RepaymentPlanTable';

function App() {
  return (
    <div className="App">
      <div class="container">
        <div class="row">
          <h2>
            .
          </h2>
        </div>

        <div class="row">
            <div class="col-md-8">

              <div class="card-body">
                <RepaymentForm/>
              </div> 

            </div>
            <div class="col-dm-4">
                <p>
                    Berechnung
                </p>
                <RepaymentPlanTable/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
