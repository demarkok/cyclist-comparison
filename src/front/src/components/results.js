import React from 'react';
import Paper from 'material-ui/Paper';
import Tile from './tile.js';
import { Statistic, Container } from 'semantic-ui-react';

const winColor = "#F8FFEE";
const loseColor = "#FFF6F5";

let centerStats = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2em",
    marginBottom: "2em"
};

class Results extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        var tiles = [];

        var wins = 0;
        var lose = 0;
        for (var i = 0; i < this.props.items.length; i++) {
            let tile = this.props.items[i];
            let color = this.identifyTile(tile);

            if (color === winColor) {
                wins++;
            } else {
                lose++;
            };

            tiles.push(
                <Tile data={tile}
                      style={{ marginTop: "20px",
                               marginLeft: "2em",
                               marginRight: "2em" 
                      }}
                      center={this.props.center}
                      tileColor={color}/> 
            );
        }

        return (
            <div>
                {this.renderStats(wins, lose)}

                {tiles}
            </div>
        );
    }; 

    renderStats = (wins, lose) => {
        let statsColor = "";

        if (wins > lose) {
            statsColor = "green";
        }

        if (wins === lose) {
            statsColor = "blue";
        }

        if (wins < lose) {
            statsColor = "red";
        }

        const items = [ 
            { label: "Wins", value: wins },
            { label: "Lose", value: lose }
        ];

        return (
            <div>
                <div>
                    <h2 style={{ marginTop: "20px", textAlign: "center" }}> {this.props.firstName} </h2>
                </div>

                <Container style={centerStats}>
                    <div>
                        <Statistic label="Wins" value={wins} color={statsColor} style={{ marginRight: "2em" }}/>
                        <Statistic label="Lose" value={lose} color={statsColor}/>
                    </div>
                </Container>
            </div>
        );
    };

    getNameIndex = (tile) => {
        for (var i = 0; i < tile.columnNames.length; i++) {
            let column = tile.columnNames[i];

            // assume that column names contains this record
            if (column === "name" || column === "Name") {
                return i;
            }
        }

        return 0;
    }

    identifyTile = (tile) => {
        let nameIndex = this.getNameIndex(tile);
        // assume, that there is only two persons
        // first line is the winner of two persons. firstName -- name of our team
        if (tile.members[0][nameIndex] === this.props.firstName) {
            return winColor;
        }

        return loseColor;
    };
};

export default Results;