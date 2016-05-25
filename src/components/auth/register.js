import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          defaultValue={'Name'}
          value={this.state.name}
          onChangeText={(t) => {
            this.setState({name: t})
          }}
        />
        <Button
        containerStyle={{padding:10, marginVertical: 20, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
           style={{fontSize: 20 }}
          onPress={() => { this._login(); Actions.root(); }}>Go</Button>
        <Text style={styles.text}>
          (No passwords today.)
        </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#D6D6D6',
    marginTop: 64
  },
  wrapper: {
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    marginTop: 60,
    borderColor: 'gray',
    borderWidth: 1
  },
  text: {
    textAlign: 'center'
  }
})
