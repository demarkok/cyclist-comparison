import React from 'react';
import { Menu, Container } from 'semantic-ui-react'
import { Flag, Segment } from 'semantic-ui-react'

class MenuHeader extends React.Component {
    constructor() {
        super();
    };

    render() {
        return (
            <Menu fixed='top' inverted size='large'>
                <Container>
                    <Menu.Item as='a' active> Comparison </Menu.Item>
                    <Menu.Item as='a'> Races </Menu.Item>
                    <Menu.Item as='a'> About </Menu.Item>
                    <Menu.Item position='right'>  
                        <Flag name='ru' />
                        <Flag name='us' />
                    </Menu.Item>
                </Container>
            </Menu>
        );
    };
};

export default MenuHeader;