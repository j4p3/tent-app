import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

import ChatsIndex from '../chats/index'

export default class TentsShow extends Component {
  render() {
    return (
      <View>
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
