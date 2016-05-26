import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import ChatsIndex from '../chats/index'
import Container from '../../styles/global'

export default class TentsShow extends Component {
  render() {
    return (
      <View style={Container.wrapper}>
        <ChatsIndex/>
      </View>
    )
  }
}
