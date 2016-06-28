import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import { Actions } from 'react-native-router-flux';

import { Wrapper } from '../util/baseComponents'
import { GlobalStyles } from '../../styles/global'

export default class Flash extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  componentDidMount() {
    // @todo figure out how to prevent double-back
    setTimeout(() => { Actions.pop() }, 2000)
  }

  render() {
    return (
      <Wrapper style={{flex: 1}}>
        <Text style={GlobalStyles.itemBody}>{this.props.message}</Text>
      </Wrapper>
    )
  }
}
