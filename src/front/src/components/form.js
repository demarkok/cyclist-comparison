import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

let centerRow = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
};

const emptyError = "Please, enter sportsman name";

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            secondName: "",
            emptyFirstNameError: null,
            emptySecondNameError: null,
        };
    };

    render() {
        return (
            <div style={this.props.center}>
                <Paper zDepth={2}>
                    <div style={centerRow}>
                        <TextField floatingLabelText="First name"
                                   style={{ marginRight: "10px", 
                                            marginLeft: "10px" }}
                                   errorText={this.state.emptyFirstNameError}
                                   onChange={this.handleFirstNameChange.bind(this)}
                                   />

                        <TextField floatingLabelText="Second name"
                                   style={{ marginRight: "10px" }}
                                   errorText={this.state.emptySecondNameError}
                                   onChange={this.handleSecondNameChange.bind(this)}
                                   />
                    </div>

                    <div style={this.props.center}>
                        <RaisedButton label="Compare"
                                      style={{ marginBottom: "10px",
                                               marginTop: "15px" }}
                                      onClick={this.validation.bind(this)}
                                      />
                    </div>
                </Paper>                                  
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

        // TODO: create url request and recieve response
        // and send response to ui component
    };  
};

export default Form;