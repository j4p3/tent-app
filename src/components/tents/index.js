import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import TentsShow from './show'

export default class TentsIndex extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Tents: index</Text>
        <TentsShow/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#D6D6D6'
  }
})