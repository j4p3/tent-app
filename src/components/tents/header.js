import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class TentsHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Tent Header </Text>
        <Text> XX </Text>
        <Text>Tent Header </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  }
})