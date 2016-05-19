import React, { Component } from 'react'
import {
  View,
  ListView
} from 'react-native'

export default class ChatView extends ListView {
  render() {
    return (
      <ListView {...this.props}/>
    )
  }
}

