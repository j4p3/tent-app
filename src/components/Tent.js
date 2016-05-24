/**
 * Tent client
 * @flow
 */

import React, { Component } from 'react'
import {
  Navigator,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native'
import {Scene, Reducer, Router, Switch, Modal, Schema, Actions} from 'react-native-router-flux'

import TentsIndex from './tents/index'
import TentsShow from './tents/show'
import ChatsIndex from './chats/index'
import ChatsShow from './chats/show'
import NavDrawer from './nav/navdrawer'
import TabIcon from './nav/tabicon'

export default class Tent extends React.Component {
  render() {
    return (
      <Router createReducer={reducerCreate}>
        <Scene key='root' hideNavBar={true} hideTabBar={true}>
          <Scene
            key='drawer'
            component={NavDrawer}>
            <Scene key="main" icon={TabIcon}>
              <Scene
                key='tentsindex'
                title='Tents'
                component={TentsIndex}
                icon={TabIcon}
                initial={true}/>
              <Scene
                key='tentsshow'
                component={TentsShow}
                title='Tent'>
                <Scene
                  key='chatsindex'
                  component={ChatsIndex}/>
              </Scene>
              <Scene
                key='chatsshow'
                component={ChatsShow}
                title='Chat'/>
            </Scene>
          </Scene>
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
 