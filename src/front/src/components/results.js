import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Tile from './tile.js';
import { Statistic } from 'semantic-ui-react';

class Results extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        var tiles = [];

        for (var i = 0; i < this.props.items.length; i++) {
            tiles.push(
                <Tile data={this.props.items[i]}
                      style={{ marginTop: "20px" }}
                      center={this.props.center}/> 
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
};

export default Results;