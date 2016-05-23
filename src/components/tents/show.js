import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import ChatsIndex from '../chats/index'

export default class TentsShow extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Tents: show
        </Text>
        <View>
          <ChatsIndex/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#D6D6D6',
    marginTop: 64
  }
})
