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
import ChatsShow from './chats/show'
import NavDrawer from './nav/navdrawer'
import Register from './auth/register'
import Flash from './util/modal'
import { NotificationMenu, NotificationSwitch } from './user/notifications'
import { GlobalStyles } from '../styles/global'
import Api from '../stores/api'

export default class Tent extends React.Component {
  constructor(props) {
    super(props);

    this._api = new Api()
    this.state = {
      store: {},
      tents: {}
    };
  }

  render() {
    return (
      <Router createReducer={reducerCreate.bind(this)}
        drawerImage={require('../assets/ic_menu_black_48dp.png')}
        navigationBarStyle={{backgroundColor: 'white'}}>
        <Scene
          initial={true}
          key='register'
          title='keep it in the tent.'
          component={Register}
          global={this}/>
        <Scene
          key='root'
          hideNavBar={true}
          hideTabBar={true}>
          <Scene
            initial={true}
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
                title='say something'
                component={PostsNew}
                global={this}/>
              <Scene
                initial={true}
                key='tentsshow'
                title="posts in this tent"
                renderRightButton={() => <NotificationMenu
                  user={this.state.user} />}
                component={TentsShow}
                global={this}/>
              <Scene
                key='postsshow'
                component={PostsShow}
                title='post'
                renderRightButton={() => <NotificationSwitch
                  user={this.state.user} />}
                global={this}/>
              <Scene
                key='chatsshow'
                component={ChatsShow}
                title='chat'
                renderRightButton={() => <NotificationSwitch
                  user={this.state.user} />}
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
      if (action.scene && (action.scene.name == 'postsshow' || action.scene.name == 'chatsshow')) {
        action.scene.renderRightButton = () => {
          return (<NotificationSwitch user={action.scene.global.state.user} post={action.scene.post}/>)
        }
      }
      return defaultReducer(state, action);
  }
};
 