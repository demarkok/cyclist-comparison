import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Tile from './tile.js';

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
                {tiles}
            </div>
        );
    }; 
};

export default Results;