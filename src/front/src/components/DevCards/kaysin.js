import React from 'react';
import { Image, Header, List, Card, Icon, Button } from 'semantic-ui-react'

let center = {
    display: "relative",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};

class Kaysin extends React.Component {
	render() {
		return (
			<Card centered>
                <Image src='https://pp.userapi.com/c604525/v604525993/5e50/gOfUowMqpsE.jpg' size="medium" />
                <Card.Content>
                    <Card.Header>
                        Ilya Kaysin
                    </Card.Header>

                    <Card.Meta>
                        back-end
                    </Card.Meta>

                    <Card.Description>
                        <Header size='tiny'> Skills </Header>

                        <List>
                            <List.Item> FP: haskell, understand Moskvin's jokes </List.Item>
                            <List.Item> lacrica the best </List.Item>
                        </List>
                    
                    </Card.Description>

                </Card.Content>
                
                <Card.Content extra>
                    <Header size='tiny'> Contacts </Header>

                    <List>
                        <List.Item>
                            <div>
                                <Icon name="mail"/>
                                <a href='mailto:demarkok@gmail.com'>demarkok@gmail.com</a>
                            </div>
                        </List.Item>

                        <List.Item>
                            <List horizontal>
                                <List.Item>
                                    <a href='https://vk.com/dmrkk'> <Icon name="vk" size="big" /> </a>
                                </List.Item>

                                <List.Item>
                                    <a href='https://telegram.me/dmrkk'> <Icon name="telegram" size="big" /> </a>
                                </List.Item>

                                <List.Item>
                                    <a href='https://github.com/demarkok'> <Icon name="github" size="big" /> </a>
                                </List.Item>
                            </List>
                        </List.Item>
                    </List>
                    
                </Card.Content>
            </Card>
		);
	}
}

export default Kaysin;