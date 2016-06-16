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
import PostsIndex from './posts/index'
import PostsShow from './posts/show'
import PostsNew from './posts/new'
import NavDrawer from './nav/navdrawer'
import Register from './auth/register'
import Flash from './util/modal'
import GlobalStyles from '../styles/global'
import Api from '../stores/api'

export default class Tent extends React.Component {
  constructor(props) {
    super(props);

    this._api = new Api()
    this.state = {
      store: {},
      tents: []
    };
  }

  componentDidMount() {
    let _this = this
    this._api.tents().then(function (s) {
      _this.setState({ tents: s })
    })
  }

  render() {
    return (
      <Router createReducer={reducerCreate}
        drawerImage={require('../assets/ic_menu_black_48dp.png')}
        navigationBarStyle={{backgroundColor: 'white'}}>
        <Scene
          key='register'
          title='Keep it in the Tent.'
          component={Register}
          initial={true}
          global={this}/>
        <Scene
          key='root'
          hideNavBar={true}
          hideTabBar={true}>
          <Scene
            key='drawer'
            component={NavDrawer}
            global={this}>
            <Scene key="main">
            <Scene
                key='flash'
                title=''
                component={Flash}
                hideTabBar={true}/>
              <Scene 
                key='postsnew'
                title='New Post'
                component={PostsNew}/>
              <Scene
                key='tentsindex'
                title="Tents I'm In"
                component={TentsIndex}
                initial={true}/>
              <Scene
                key='tentsshow'
                title="Posts in this Tent"
                component={TentsShow}>
                <Scene
                  key='postsshow'
                  component={PostsShow}
                  title='Chat'
                  global={this}/>
              </Scene>
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
 