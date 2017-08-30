import React from 'react';
import Comparison from './comparison.js'
import Portfolio from './portfolio.js';
import { Menu, Container } from 'semantic-ui-react'
import { Flag, Segment } from 'semantic-ui-react'

const comparisonName = "Comparison";
const racesName = "Races";
const aboutName = "About";

class MenuHeader extends React.Component {
    constructor() {
        super();

        this.state = {
            savedState: null,
            itemName: comparisonName,
            item: <Comparison savePrevState={this.savePrevState.bind(this)} />
        };
    };

    savePrevState = (state) => {
        this.setState({
            savedState: state
        });
    };

    handleItemClick = (e, { name }) => {
        this.setState({ 
            itemName: name
        });

        // TODO: triple if
        if (name === comparisonName) {
            this.setState({
                item: <Comparison prevState={this.state.savedState}
                                  savePrevState={this.savePrevState.bind(this)}/>
            });
        }

        if (name === racesName) {
            this.setState({
                item: null
            });
        }

        if (name === aboutName) {
            this.setState({
                item: <Portfolio />
            });
        }
    };

    render() {
        return (
            <div>
                <Menu fixed='top' inverted size='large'>
                    <Container>
                        <Menu.Item name={comparisonName}
                                   active={this.state.itemName === comparisonName}
                                   onClick={this.handleItemClick.bind(this)}> 
                                   Comparison
                        </Menu.Item>

                        <Menu.Item name={racesName}
                                   active={this.state.itemName === racesName} 
                                   onClick={this.handleItemClick.bind(this)}> 
                                   Races 
                        </Menu.Item>

                        <Menu.Item name={aboutName}
                                   active={this.state.itemName === aboutName} 
                                   onClick={this.handleItemClick.bind(this)}> 
                                   About
                        </Menu.Item>

                        <Menu.Item position='right'>  
                            <Flag name='ru' />
                            <Flag name='gb' />
                        </Menu.Item>
                    </Container>
                </Menu>

                {this.state.item}
            </div>
        );
    };
};

export default MenuHeader;