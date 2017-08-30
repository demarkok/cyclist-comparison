import React from 'react';
import { Grid, Container, Segment, Card } from 'semantic-ui-react';
import Shavkunov from './DevCards/shavkunov.js';
import Kaysin from './DevCards/kaysin.js';

let cardGroup = {
    marginTop: "4em",
    display: "flex",
    flexDirection: "row",
    justifyСontent: "center"
};

class Portfolio extends React.Component {
    constructor() {
        super();
    };

    render() {
        return (
            <Container>
                <Card.Group style={cardGroup}>
                    <Shavkunov /> 
                    <Kaysin />
                </Card.Group>
            </Container>
        );
    };
};

export default Portfolio;