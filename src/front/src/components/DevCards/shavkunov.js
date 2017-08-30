import React from 'react';
import { Image, Header, List, Card, Icon, Button } from 'semantic-ui-react'

let listStyle = {
	display: "relative",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    listStyleType: "none"
};

class Shavkunov extends React.Component {
	render() {
		return (
			<Card centered>
                <Image src='https://pp.userapi.com/c619317/v619317890/12a32/9PQXnwAxWMY.jpg' size="medium" />
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
                            <List.Item> Don't understand Moskvin's jokes </List.Item>
                        </List>
                    
                    </Card.Description>

                </Card.Content>

                <Card.Content extra>
                	<Header size='tiny'> Contacts </Header>
            		<List>
            			<List.Item>
            				<div>
                    			<Icon name="mail"/>
                    			<a href='mailto:mv.shavkunov@yandex.ru'>mv.shavkunov@yandex.ru</a>
                    		</div>
                        </List.Item>

            			<List.Item>
            				<List horizontal>
                        		<List.Item>
                        			<a href='https://vk.com/mv.shavkunov'> <Icon name="vk" size="big" /> </a>
                        		</List.Item>

                        		<List.Item>
                        			<a href='https://telegram.me/MShavkunov'> <Icon name="telegram" size="big" /> </a>
                        		</List.Item>

                        		<List.Item>
                        			<a href='https://github.com/shavkunov/'> <Icon name="github" size="big" /> </a>
                        		</List.Item>
                        	</List>
                    	</List.Item>
               		</List>
                </Card.Content>
            </Card>
		);
	}
}

export default Shavkunov;