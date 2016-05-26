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
  View,
  Animations
} from 'react-native'
import {Scene, Reducer, Router, Switch, Modal, Schema, Actions} from 'react-native-router-flux'

import TentsIndex from './tents/index'
import TentsShow from './tents/show'
import ChatsIndex from './chats/index'
import ChatsShow from './chats/show'
import NavDrawer from './nav/navdrawer'
import TabIcon from './nav/tabicon'
import Register from './auth/register'
import GlobalStyles from '../styles/global'

export default class Tent extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      store: {}
    };
  }

  render() {
    return (
      <Router createReducer={reducerCreate}>
        <Scene
          key='register'
          title='Keep it in the Tent.'
          component={Register}
          initial={true}
          global={this}/>
        <Scene key='root'
          hideNavBar={true}
          hideTabBar={true}>
          <Scene
            key='drawer'
            component={NavDrawer}>
            <Scene key="main" icon={TabIcon}>
              <Scene
                key='tentsindex'
                title="Tents I'm In"
                component={TentsIndex}
                icon={TabIcon}
                initial={true}/>
              <Scene
                key='tentsshow'
                title='This Tent'
                component={TentsShow}>
                <Scene
                  key='chatsindex'
                  title='Topics in this Tent'
                  component={ChatsIndex}/>
              </Scene>
              <Scene
                key='chatsshow'
                component={ChatsShow}
                title='Chat'
                global={this}/>
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
 