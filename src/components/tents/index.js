import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

import TentsShow from './show'

export default class TentsIndex extends Component {
  render() {
    return (
      <View>
        <Text>Tents: index</Text>
        <View>
          <TentsShow/>
        </View>
      </View>
    )
  }
}

