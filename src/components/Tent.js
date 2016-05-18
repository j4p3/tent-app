/**
 * Test Firebase app
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
// import Firebase from 'firebase'

import TentsIndex from './tents/index'

export default class Tent extends Component {
  render() {
    return (
      <View>
        <Text>Global</Text>
        <TentsIndex/>
      </View>
    )
  }
}
