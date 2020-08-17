import React from 'react';

function isValidPercentage(value) {
    let val = value.replace(',', '.');
    if (isNaN(val)) {
        return false;
    }
    if (parseFloat(val) < 0 || parseFloat(val) > 100) {
        return false;
    }
    return true;
}

function isValidFund(value) {
    if (value === '') {
        return true;
    }
    let val = value.replace(',', '.');
    return val.match(/^\$?\d*\.?\d{0,2}$/);
}

class RepaymentForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          betrag: '',
          zins: '',
          satz: ''
        };
      this.setBetrag = this.setBetrag.bind(this);
      this.setZinssatz = this.setZinssatz.bind(this);
      this.setTilgungssatz = this.setTilgungssatz.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    // TODO: Setters need value checks and Defaults
    setZinssatz(event) {
        // TODO isNan etc. into one method
        if (isValidPercentage(event.target.value)){
            this.setState({
                zins: event.target.value
            });
            console.log("Zins change registered " + this.state.zins);
        }
    }

    setBetrag(event) { 
        // TODO: prevent more than 2 numbers behind ','/'.'
        if (isValidFund(event.target.value)){
            this.setState({
                betrag: event.target.value
            });
            console.log("Betrag change registered " + this.state.betrag);
        }
    }

    setTilgungssatz(event) { 
        if (isValidPercentage(event.target.value)){
            this.setState({
                satz: event.target.value
            });
            console.log("Satz change registered " + this.state.satz);
        }
    }

    handleSubmit(event) {
        console.log('Submitted: '); 
        console.log(this.state.betrag);
        console.log(this.state.zins);
        console.log(this.state.satz);
        event.preventDefault();
    }

    render() {
      return (
        <form>
            <div class="form-param">
                <p>Darlehensbetrag</p>
                <input value={this.state.betrag} onChange={this.setBetrag} type="text" placeholder="200,00"/>
            </div>
            <div class="form-param">
                <p>Sollzins % p.a.</p>
                <input value={this.state.zins} onChange={this.setZinssatz} type="text"  placeholder="2,0"/>
            </div>
            <div class="form-param">
                <p>Tilgungssatz (% erstes Jahr)</p>
                <input value={this.state.satz} onChange={this.setTilgungssatz} type="text" placeholder="5,0" />
            </div>
            <input type="submit" onClick={this.handleSubmit} value="Berechnen" />
        </form>
      );
    }
  }

export default RepaymentForm;