import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { Actions } from 'react-native-router-flux';

import PostsIndex from '../posts/index'

export default class TentsShow extends Component {
  constructor(props) {
    super(props)

    this.tent = this.props.tent || this.props.global.state.tents

    this.state = {
      loaded: false
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <PostsIndex
          parent={this}
          tentId={this.tent.id}/>
      </View>
    )
  }
}
