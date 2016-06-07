import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

export default class Break extends Component {
  render() {
    return (
      <View style={styles.full}>
        <View style={styles.break}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  full: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  break: {
    width: 120,
    marginVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#828287'
  }
})