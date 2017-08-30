import React from 'react';
import { Grid, Container, Segment, Card } from 'semantic-ui-react';
import Shavkunov from './DevCards/shavkunov.js';
import Kaysin from './DevCards/kaysin.js';

let card = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "7em"
};

class Portfolio extends React.Component {
    constructor() {
        super();
    };

    render() {
        return (
            <Card.Group style={{ margin: "5em",
                                 marginRight: "3em",
                          display: "flex",
                          flexDirection: "row",
                          justifyСontent: "center" }}>
                <Shavkunov /> 
                <Kaysin />
            </Card.Group>
        );
    };
};

export default Portfolio;