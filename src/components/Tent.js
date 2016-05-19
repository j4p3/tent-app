/**
 * Test Firebase app
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
// import Firebase from 'firebase'

import TentsIndex from './tents/index'

export default class Tent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Global</Text>
        <TentsIndex/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30
  }
})