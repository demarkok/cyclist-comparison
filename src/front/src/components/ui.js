import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Form from './form.js';
import Results from './results.js';
import jsonSource from './source.js';

let centerComponents = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
};

class UI extends React.Component {
    constructor() {
        super();
    };

    render() {
        return (
            <div style={centerComponents}> 
                <h1 style={{ textAlign: "center",
                	         fontFamily: "Roboto" }}> Comparison </h1>

                <Form center={centerComponents}
                      />

                <Results items={jsonSource.json}
                         center={centerComponents}
                         />
            </div>
        );
    };
};

export default UI;
exports.centerComponents = centerComponents;