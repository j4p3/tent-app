/**
 * Tent client
 * @flow
 */

import React, { Component } from 'react'
import {
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'

import TentsIndex from './tents/index'
import TentsShow from './tents/show'
import ChatsIndex from './chats/index'
import ChatsShow from './chats/show'

export default class Tent extends Component {
  render() {
    return (
      <View>
        <Text>Global</Text>
        <TentsIndex/>
      </View>
    )
  }
}

export default class Example extends React.Component {
  render() {
    return (
      <Router createReducer={reducerCreate}>
        <Scene key="root">
          <Scene key="tents" component={TentsIndex} title="Tents" initial={true} />
        </Scene>
      </Router>
    )
  }
}

const reducerCreate = params=>{
  const defaultReducer = Reducer(params);
  return (state, action)=>{
      console.log("ACTION:", action);
      return defaultReducer(state, action);
  }
};
