import React, { Component } from 'react';
import './RepaymentPlanTable.css';

class RepaymentPlanTable extends Component {
    constructor(props) {
        super(props);
        this.getTableBody = this.getTableBody.bind(this);
        this.getColumnNames = this.getColumnNames.bind(this);
    }

    getTableBody() {
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
