import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RepaymentForm from './RepaymentForm';

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

              {/* <div class="card-body">
                <button>
                  Berechnen
                </button>
              </div> */}

            </div>
            <div class="col-dm-4">
                <p>
                    Berechnung
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
