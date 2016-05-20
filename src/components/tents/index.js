import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

import TentsShow from './show'
import TentsHeader from './header'

export default class TentsIndex extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TentsHeader/>
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