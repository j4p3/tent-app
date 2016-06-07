import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

import GlobalStyles from '../../styles/global'

export default class Register extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      name: ''
    };
  }

  _store(o) {
    var s = Object.assign({}, this.props.global.state.store, o)
    this.props.global.setState({store: s})
  }

  _login() {
    // this._store({name: this.state.name})
    this.props.global.setState({store: {name: this.state.name}})
  }

  componentDidMount() {
    console.log('wat')
  }

  render() {
    return (
      <View style={GlobalStyles.wrapper}>
        <TextInput
          style={[GlobalStyles.input, GlobalStyles.vSpace]}
          placeholder='Name'
          value={this.state.name}
          onChangeText={(t) => {
            this.setState({name: t})
          }}
        />
        <Button
          containerStyle={[GlobalStyles.buttonContainer, GlobalStyles.vSpace]}
          style={[GlobalStyles.text, GlobalStyles.buttonInterior]}
          onPress={() => { this._login(); Actions.root(); }}>Go</Button>
        <Text style={[styles.text, GlobalStyles.vSpace]}>
          (No passwords today. Be whoever you want to be.)
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  }
})
