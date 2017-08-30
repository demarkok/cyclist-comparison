import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import $ from "jquery";
import { deepPurple500 } from 'material-ui/styles/colors';

let centerRow = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
};

let formMargin = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5em"
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
            <div style={formMargin}>
                <Paper zDepth={2} >
                    <div style={centerRow}>
                        <TextField floatingLabelText="First name"
                                   style={{ marginRight: "10px", 
                                            marginLeft: "10px" }}
                                   errorText={this.state.emptyFirstNameError}
                                   errorStyle={{ color: deepPurple500 }}
                                   onChange={this.handleFirstNameChange.bind(this)}
                                   />

                        <TextField floatingLabelText="Second name"
                                   style={{ marginRight: "10px" }}
                                   errorText={this.state.emptySecondNameError}
                                   errorStyle={{ color: deepPurple500 }}
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
        let name1 = this.state.firstName;
        let name2 = this.state.secondName;

        if (name1 === "") {
            this.setState({
                emptyFirstNameError: emptyError
            });

            return;
        }

        this.setState({
            emptyFirstNameError: null
        });

        if (name2 === "") {
            this.setState({
                emptySecondNameError: emptyError
            });

            return;
        }

        this.setState({
            emptySecondNameError: null
        });

        let params = "name1=" + name1 + "&" + "name2=" + name2;  
        let requestUrl = encodeURI("http://localhost:1234/api/getCommonCompetitions?" + params);
        let proceedData = this.props.sendToPreviousComponent;
        $.ajax({
            type: "GET",
            url: requestUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response) {
                // TODO : error
                console.log(response);
                proceedData(name1, name2, response);
            }
        });
    };  
};

export default Form;