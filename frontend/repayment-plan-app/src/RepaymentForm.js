import React from 'react';
import './RepaymentForm.css';
import RepaymentPlanTable from './RepaymentPlanTable';

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
            satz: '',
            monthlyRate: 0,
            repaymentPlan: [],
            // after first calculation
            // calculation updates should happen after changing values
            calculatedBefore: false,
            typingTimeout: 0,
        };
        this.setBetrag = this.setBetrag.bind(this);
        this.setZinssatz = this.setZinssatz.bind(this);
        this.setTilgungssatz = this.setTilgungssatz.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    setZinssatz(event) {
        if (isValidPercentage(event.target.value)) {
            this.setState({
                zins: event.target.value
            });
        }
    }

    setBetrag(event) {
        if (isValidFund(event.target.value)) {
            this.setState({
                betrag: event.target.value
            });
        }
    }

    setTilgungssatz(event) {
        if (!isValidPercentage(event.target.value)) {
            return;
        }
        this.setState({
            satz: event.target.value
        });
    }

    handleSubmit(event) {
        if (this.state.betrag === '' || this.state.zins === '' || this.state.satz === '') {
            return;
        }

        if (!this.calculatedBefore) {
            this.setState({
                calculatedBefore: true
            });
        }

        this.calculate();
        event.preventDefault();
    }


    calculate() {
        // CORS header ‘Access-Control-Allow-Origin’ missing
        // https://stackoverflow.com/questions/45975135/access-control-origin-header-error-using-axios-in-react-web-throwing-error-in-ch
        // Endpoint:
        const headers = { 'Content-Type': 'application/json' }
        fetch(
            'http://localhost:8080/redemption_plan/?betrag=' + this.state.betrag +
            '&zinssatz=' + this.state.zins + '&anfangstilgung=' + this.state.satz, { headers })
            .then(response => response.json())
            .then(data => this.setState({
                monthlyRate: data.rate,
                repaymentPlan: data.tilgungsplan
            }));
    }

    componentDidUpdate(previousProps, previousState) {
        if (this.state.betrag === '' || this.state.zins === '' || this.state.satz === '') {
            return;
        }

        if (previousState.betrag !== this.state.betrag || previousState.zins !== this.state.zins || previousState.satz !== this.state.satz) {
            if (this.state.calculatedBefore) {
                this.calculate();
            }
        }
    }

    render() {
        return (
            <div class="row">
                <div class="col-md-4 col-lg-6">
                    <div class="card-body">
                        <form>
                            <div class="form-param">
                                <p>Darlehensbetrag</p>
                                <input value={this.state.betrag} onChange={this.setBetrag} type="text" placeholder="200,00" />
                            </div>
                            <div class="form-param">
                                <p>Sollzins % p.a.</p>
                                <input value={this.state.zins} onChange={this.setZinssatz} type="text" placeholder="2,0" />
                            </div>
                            <div class="form-param">
                                <p>Tilgungssatz (% erstes Jahr)</p>
                                <input value={this.state.satz} onChange={this.setTilgungssatz} type="text" placeholder="5,0" />
                            </div>
                            <button onClick={this.handleSubmit}>Berechnen</button>
                        </form>
                    </div>
                    <div class="card-body monthly-rate" style={{ visibility: this.state.monthlyRate == 0 ? 'hidden' : 'visible' }}>
                        <p>
                            Monatsrate von {this.state.monthlyRate} &euro;
                    </p>
                    </div>
                </div>
                <div class="col-md-8 col-lg-6">
                    <RepaymentPlanTable rate={this.state.monthlyRate} data={this.state.repaymentPlan} columnNames={['Restschuld', 'Zinsen', 'Tilgung', 'Zinsanteil %']} />
                </div>

            </div>
        );
    }
}

export default RepaymentForm;
