import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Item, Input, Label, Button, Text } from 'native-base';
import styles from './styles';
import Db from '../../db';
export default class Home extends Component {
  static navigationOptions = {
    title: 'Virtual Cards',
  };

  constructor() {
    super();
    this.state = {
      name: '',
    };

    this.db = new Db();
  }

  createParty = async (e) => {
    const party = await this.db.createParty(this.state.name);
    alert(`Party Id: ${party.id}`);
    this.props.navigation.navigate('Lobby');
  }

  onNameChange = (name) => {
    this.setState({ name });
  }
  
  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content} scrollEnabled={false}>
          <Item floatingLabel>
            <Label>Nombre</Label>
            <Input onChangeText={this.onNameChange}/>
          </Item>
          <Button block bordered success style={styles.button} onPress={this.createParty}>
            <Text>Create</Text>
          </Button>
          <Button
            block
            bordered
            info
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Join')}
          >
            <Text>Join</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}