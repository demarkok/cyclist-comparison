import React from 'react';
import { Image, Header, List, Card } from 'semantic-ui-react'

class Shavkunov extends React.Component {
	render() {
		return (
			<Card>
                <Image src='https://pp.userapi.com/c619317/v619317890/12a32/9PQXnwAxWMY.jpg' size='large' />
                <Card.Content>
                    <Card.Header>
                        Mikhail Shavkunov
                    </Card.Header>

                    <Card.Meta>
                        front-end
                    </Card.Meta>

                    <Card.Description>
                        <Header size='tiny'> Skills </Header>

                        <List>
                            <List.Item> Web: Javascript, Webpack, React </List.Item>
                            <List.Item> Other: Java, Spring boot, REST </List.Item>
                        </List>
                    
                    </Card.Description>

                </Card.Content>

                <Card.Content extra>
                    <Header size='tiny' textAlign='center'> Contacts </Header>
                    <List>
                        <List.Item>
                            <List.Icon name="vk"/>
                            <List.Content>
                                <a href='https://vk.com/mv.shavkunov'> vk </a>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name="telegram"/>
                            <List.Content>
                                <a href='https://telegram.me/MShavkunov'> MShavkunov </a>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name="github"/>
                            <List.Content>
                                <a href='https://github.com/shavkunov/'> shavkunov </a>
                            </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name="mail"/>
                            <List.Content>
                                <a href='mailto:mv.shavkunov@yandex.ru'>mv.shavkunov@yandex.ru</a>
                            </List.Content>
                        </List.Item>
                    </List>
                </Card.Content>
            </Card>
		);
	}
}

export default Shavkunov;