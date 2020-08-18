import React, { Component } from 'react'

class RepaymentPlanTable extends Component {
   constructor(props) {
        super(props);
        this.state = {
            header: '',
            data: [],
            columnNames: ['Restschuld', 'Zinsanteil', 'Tilgungsanteil', 'Zinsanteil %']
        }
        this.getRows = this.getRows.bind(this);
        this.getColumnNames = this.getColumnNames.bind(this);
    }

    getRows() {
        return (
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
            </tr>
        );
    }

    getColumnNames() {
        return (
            <tr>
                {this.state.columnNames.map(columnName => (
                    <th>
                        {columnName}
                    </th>
                ))}
            </tr>
        );
    }

    render() {
        return (
            <table>
                <thead>
                    {this.getColumnNames()}
                </thead>
                <tbody>
                    {this.getRows()}
                </tbody>
            </table>
        );
    }

}



export default RepaymentPlanTable;