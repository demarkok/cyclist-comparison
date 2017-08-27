import React from 'react';
import Paper from 'material-ui/Paper';
import Tile from './tile.js';
import { Statistic } from 'semantic-ui-react';

const winColor = "#F8FFEE";
const loseColor = "#FFF6F5";

class Results extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        var tiles = [];

        for (var i = 0; i < this.props.items.length; i++) {
            let tile = this.props.items[i];
            let color = this.identifyTile(tile);

            tiles.push(
                <Tile data={tile}
                      style={{ marginTop: "20px" }}
                      center={this.props.center}
                      tileColor={color}/> 
            );
        }

        return (
            <div>
                <div>
                    <h2> Ilya </h2>
                    <Statistic value='2' label='Wins' />
                    <Statistic value='1' label='Lose' />

                    <h2> Misha </h2>
                    <Statistic value='1' label='Wins' />
                    <Statistic value='2' label='Lose' />
                </div>

                {tiles}
            </div>
        );
    }; 

    getNameIndex = (tile) => {
        for (var i = 0; i < tile.columnNames.length; i++) {
            let column = tile.columnNames[i];

            // assume that column names contains this record
            if (column === "name") {
                return i;
            }
        }

        return 0;
    }

    identifyTile = (tile) => {
        let nameIndex = this.getNameIndex(tile);

        console.log(nameIndex);
        // assume, that there is only two persons
        // first line is the winner of two persons. firstName -- name of our team
        if (tile.members[0][nameIndex] === this.props.firstName) {
            return winColor;
        }

        return loseColor;
    };
};

export default Results;