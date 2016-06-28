import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import { MKButton, MKTextField } from 'react-native-material-kit'

import { GlobalStyles, Palette } from '../../styles/global'
import Api from '../../stores/api'
import { Wrapper } from '../util/baseComponents'

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
          user: {
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
        console.log(r)
        _this.props.global.setState({
          user: {
            email: r.email,
            id: r.id,
            avatar: r.avatar
          }
        })
        console.log(_this.props.global.state.user)
        Actions.root()
        // @todo make a global response handler object & overwrite the 'ok' condition
      } else if (r.error) { _this.setState({error: r.error, password: ''})
      } else { _this.setState({error: 'Server error.', password: ''}) }
    })
  }

  render() {
    // @todo login/create bottom tab switcher
    return (
      <Wrapper>
        <Text style={GlobalStyles.itemBody}>{this.state.error}</Text>

        <View style={GlobalStyles.vSpace}><MKTextField
            tintColor={Palette.text}
            textInputStyle={[GlobalStyles.text, { color: '#000' }]}
            highlightColor={Palette.accent}
            underlineSize={2}
            placeholder='Email'
            value={this.state.email}
            onChangeText={(t) => {
              this.setState({email: t})
            }}
          /></View>
        <View style={GlobalStyles.vSpace}><MKTextField
          tintColor={Palette.text}
          textInputStyle={[GlobalStyles.text, { color: '#000' }]}
          highlightColor={Palette.accent}
          underlineSize={2}
          placeholder='Password'
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(t) => {
            this.setState({password: t})
          }}
        /></View>

        <View style={GlobalStyles.vSpace}><MKButton
          {...MKButton.coloredButton().toProps()}
          backgroundColor={Palette.accent}
          shadowOpacity={0}
          onPress={() => { this._login(); }}>
            <Text style={GlobalStyles.itemBody} style={[GlobalStyles.text, {color: '#fff', fontWeight: 'bold'}]}>Login</Text>
        </MKButton></View>
        <View style={GlobalStyles.vSpace}><MKButton
          {...MKButton.coloredButton().toProps()}
          backgroundColor={Palette.accent}
          shadowOpacity={0}
          onPress={() => { this._signup(); }}>
            <Text style={GlobalStyles.itemBody} style={[GlobalStyles.text, {color: '#fff', fontWeight: 'bold'}]}>Create Account</Text>
        </MKButton></View>
      </Wrapper>
    )
  }
}

