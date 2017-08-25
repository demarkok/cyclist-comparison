import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

let center = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
};

const emptyError = "Please, enter sportsman name";

class UI extends React.Component {
    constructor() {
        super();

        this.state = {
            firstName: "",
            secondName: "",
            emptyFirstNameError: null,
            emptySecondNameError: null,
        };
    }

    render() {
        return (
            <div> 
                <h1 style={{ textAlign: "center" }}> Comparison </h1>
                <TextField floatingLabelText="First name"
                           style={{ marginRight: "10px" }}
                           errorText={this.state.emptyFirstNameError}
                           onChange={this.handleFirstNameChange.bind(this)
                           />

                <TextField floatingLabelText="Second name",
                           errorText={this.state.emptySecondNameError}
                           onChange={this.handleSecondNameChange.bind(this)
                           />

                <FlatButton label="Compare"
                            style={center}
                            onClick={this.validation.bind(this)}/>

            </div>
        );
    }

    handleFirstNameChange = (event) => {
        this.setState({
            firstName: event.target.value,
        });
    };

    handleSecondNameChange = (event) => {
        this.setState({
            secondName: event.target.value,
        });
    };

    validation = () => {
        if (this.state.firstName === "") {
            this.setState({
                emptyFirstNameError: emptyError
            });

            return;
        }

        this.setState({
            emptyFirstNameError: null
        });

        if (this.state.secondName === "") {
            this.setState({
                emptySecondNameError: emptyError
            });

            return;
        }

        this.setState({
            emptySecondNameError: null
        });

        console.log(this.state.firstName + " " + this.state.secondName);
    };
}

export default UI;