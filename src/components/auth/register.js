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
import Api from '../../stores/api'

export default class Register extends Component {
  constructor(props) {
    super(props);
  
    this._store = new Api()
    this.state = {
      email: 'api_user@unqualified.io',
      password: 'password',
      error: ''
    };
  }

  _signup() {
    let _this = this

    this._store.signup({
      email: this.state.email,
      password: this.state.password
    }).then(function (r) {
      if (!r.error) {
        _this.props.global.setState({
          store: {
            email: r.email,
            id: r.id,
            avatar: r.avatar
          }
        })
        Actions.root()
        // @todo make a global response handler object & overwrite the 'ok' condition
      } else if (r.error) { _this.setState({error: r.error, password: ''})
      } else { _this.setState({error: 'Server error.', password: ''}) }
    })
  }

  _login() {
    let _this = this

    this._store.authenticate({
      email: this.state.email,
      password: this.state.password
    }).then(function (r) {
      if (!r.error) {
        _this.props.global.setState({
          store: {
            email: r.email,
            id: r.id,
            avatar: r.avatar
          }
        })
        Actions.root()
        // @todo make a global response handler object & overwrite the 'ok' condition
      } else if (r.error) { _this.setState({error: r.error, password: ''})
      } else { _this.setState({error: 'Server error.', password: ''}) }
    })
  }

  render() {
    // @todo login/create bottom tab switcher
    return (
      <View style={GlobalStyles.wrapper}>
        <Text>{this.state.error}</Text>
        <TextInput
          style={[GlobalStyles.input, GlobalStyles.vSpace]}
          placeholder='Email'
          value={this.state.email}
          onChangeText={(t) => {
            this.setState({email: t})
          }}
        />
        <TextInput
          style={[GlobalStyles.input, GlobalStyles.vSpace]}
          placeholder='Password'
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(t) => {
            this.setState({password: t})
          }}
        />
        <Button
          containerStyle={[GlobalStyles.buttonContainer, GlobalStyles.vSpace]}
          style={[GlobalStyles.text, GlobalStyles.buttonInterior]}
          onPress={() => { this._login(); }}>
          Login</Button>
        <Button
          containerStyle={[GlobalStyles.buttonContainer, GlobalStyles.vSpace]}
          style={[GlobalStyles.text, GlobalStyles.buttonInterior]}
          onPress={() => { this._signup(); }}>
          Create Account</Button>
      </View>
    )
  }
}

