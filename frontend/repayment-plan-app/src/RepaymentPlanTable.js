import React, { Component } from 'react';
import './RepaymentPlanTable.css';

class RepaymentPlanTable extends Component {
   constructor(props) {
        super(props);
        this.getTableBody = this.getTableBody.bind(this);
        this.getColumnNames = this.getColumnNames.bind(this);
    }

    getTableBody() {
        console.log(this.props.data);
        return (
            <tbody>
                {this.props.data.map(row => (
                    <tr>
                        {row.map(value => <td>{value}</td>)}                
                    </tr>
                ))}
            </tbody>
        );
    }

    getColumnNames() {
        console.log(this.props.columnNames);
        return (
            <tr>
                {this.props.columnNames.map(columnName => (
                    <th>
                        {columnName}
                    </th>
                ))}
            </tr>
        );
    }

    render() {
        return (
            <table class="table table-hover">
                <thead>
                    {this.getColumnNames()}
                </thead>
                    {this.getTableBody()}
            </table>
        );
    }

}



export default RepaymentPlanTable;