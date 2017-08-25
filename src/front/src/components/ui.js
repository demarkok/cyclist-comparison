import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Form from './form.js';
import css from './form.js'
var jsonSource = require('./source.js');

const emptyError = "Please, enter sportsman name";

class UI extends React.Component {
    constructor() {
        super();
    };

    render() {
        return (
            <div style={css.centerComponents}> 
                <h1 style={{ textAlign: "center",
                	         fontFamily: "Roboto" }}> Comparison </h1>

                <Form />

            </div>
        );
    };
};

export default UI;