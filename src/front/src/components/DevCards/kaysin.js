import React from 'react';
import { Image, Header, List, Card } from 'semantic-ui-react'

class Kaysin extends React.Component {
	render() {
		return (
			<Card>
                <Image src='https://pp.userapi.com/c604525/v604525993/5e50/gOfUowMqpsE.jpg' size='large' />
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
                    <Header size='tiny' textAlign='center'> Contacts </Header>
                    <List>
                        <List.Item>
                            <List.Icon name="vk"/>
                            <List.Content>
                                <a href='https://vk.com/dmrkk'> vk </a>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name="telegram"/>
                            <List.Content>
                                <a href='https://telegram.me/dmrkk'> dmrkk </a>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name="github"/>
                            <List.Content>
                                <a href='https://github.com/demarkok'> demarkok </a>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name="mail"/>
                            <List.Content>
                                <a href='mailto:demarkok@gmail.com'>demarkok@gmail.com</a>
                            </List.Content>
                        </List.Item>
                    </List>
                </Card.Content>
            </Card>
		);
	}
}

export default Kaysin;