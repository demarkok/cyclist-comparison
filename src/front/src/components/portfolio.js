import React from 'react';
import { Grid } from 'semantic-ui-react';
import Shavkunov from './DevCards/shavkunov.js';
import Kaysin from './DevCards/kaysin.js';

class Portfolio extends React.Component {
    constructor() {
        super();
    };

    render() {
        return (
            <Grid columns='equal' verticalAlign='middle'>
                <Grid.Column>
                    <Shavkunov />
                </Grid.Column>

                <Grid.Column>
                    <Kaysin />
                </Grid.Column>
            </Grid>
        );
    };
};

export default Portfolio;