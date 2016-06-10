import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import { Actions } from 'react-native-router-flux';

import GlobalStyles from '../../styles/global'

export default class Flash extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => { Actions.pop() }, 2000)
  }

  render() {
    return (
      <View style={GlobalStyles.wrapper}>
        <Text>{this.props.message}</Text>
      </View>
    )
  }
}
