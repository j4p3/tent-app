import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Dimensions,
  Platform
} from 'react-native'

import { Actions } from 'react-native-router-flux';
import FoundationIcon from 'react-native-vector-icons/Foundation'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { GlobalStyles, Palette } from '../../styles/global'
import Api from '../../stores/api'

export class NotificationMenu extends Component {
  constructor(props) {
    super(props)

    this.user = props.user
    this._store = new Api()

    var events = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    })
    this._events = []

    this.state = {
      loaded: false,
      events: events,
      open: false
    }
  }

  componentDidMount() {
    var _this = this
    this._store.events(this.user).then(function (s) {
      s.map(e => e.payload = _this._content(e))
      _this._setEvents(s)
      _this.setState({loaded: true})
    })
  }

  /***************************************************************************/
  // State manipulation utilities
  /***************************************************************************/


  _toggleMenu() {
    this.setState({ open: !this.state.open })
  }

  _setEvents(events) {
    this._events = this._events.concat(events)
    this.setState({
      events: this.state.events.cloneWithRows(this._events)
    })
  }

  /***************************************************************************/
  // Templates & rendering
  /***************************************************************************/

  _content(item) {
    let contentMap = {
      interaction: i => { return i.user.name +' wants to talk about "'+ i.post.headline +'"!' },
      message: i => { return 'New message: "' + i.type_content.last_message+ '"' },
      post: i => { return 'New post: ' + i.post.headline }
    }
    if (contentMap.hasOwnProperty(item.type)) {
      return contentMap[item.type](item)
    } else {
      return item.post.content
    }
  }

  _icon(type) {
    let iconMap = {
      post: (<FoundationIcon name='megaphone'
        style={[{ backgroundColor: Palette.accent }, styles.notificationMenuIcon]}/>),
      message: (<FoundationIcon name='comments'
        style={[{ backgroundColor: Palette.offsetALight }, styles.notificationMenuIcon]}/>),
      interaction: (<MaterialIcon name='pan-tool'
        style={[{ backgroundColor: Palette.offsetBLight }, styles.notificationMenuIcon]}/>)
    }

    if (iconMap.hasOwnProperty(type)) {
      return iconMap[type]
    } else {
      return iconMap['post']
    }
  }

  _item(item) {
    return (
      <TouchableHighlight
        style={{flex: 1}}
        onPress={() => { Actions.postsshow({ post: item.post, title: item.user.name + '\'s post' }) }}>
        <View style={styles.notificationItem}>
          {this._icon(item.type)}
          <Text
            style={[GlobalStyles.bodyText, styles.notificationText]}
            numberOfLines={2}>
            {item.payload}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  _menu() {
    // @todo menu-item template thing
    if (this.state.open) {
      return (
        <View style={styles.notificationWrapper}>
        <View style={styles.notificationMenu}>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.events}
            contentContainerStyle={GlobalStyles.containerPadding}
            renderRow={(i) => this._item(i) }>
          </ListView>
        </View>
        </View>
      )
    } else {
      return null
    }
  }

  render() {
    // todo number of notifications
    return (
      <View>
      <TouchableHighlight
        onPress={() => { this._toggleMenu() }}>
        <MaterialIcon
          name='notifications'
          style={[styles.notification, styles.notificationIcon]}/>
      </TouchableHighlight>
      {this._menu()}
      </View>
    )
  }
}

export class NotificationSwitch extends Component {
  constructor(props) {
    super(props)

    this.user = props.user
    this.post = props.post
    this._store = new Api()
    console.log(this.user.subscriptions)
    console.log(this.post)
    this.state = {
      subscribed: this.user.subscriptions.indexOf(this.post.id) > 0
    }
  }

  _toggleSubscription() {
    let subscription = !this.state.subscribed
    // @todo handle subscriptions serverside
    // if (subscription) {
    //   this._store.subcribe()
    // } else {
    //   this._store.unsubcribe()
    // }
    this.setState({ subscribed: subscription })
  }

  render() {
    if (this.state.subscribed) {
      return (
        <TouchableHighlight
          onPress={this._toggleSubscription.bind(this)}>
          <MaterialIcon 
            name='notifications-active'
            style={[styles.notification, styles.notificationSwitchActive]}/>
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight
          onPress={this._toggleSubscription.bind(this)}>
          <MaterialIcon 
            name='notifications-off'
            style={[styles.notification, styles.notificationSwitchInactive]}/>
        </TouchableHighlight>
      )
    }
  }
}

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    top: 26,
    right: 6,
    fontSize: 18,
    padding: 8,
    borderRadius: 4,
  },
  notificationIcon: {
    color: Palette.focus,
    backgroundColor: Palette.accent,
  },
  notificationSwitchInactive: {
    color: Palette.accent,
    backgroundColor: Palette.focus,
    borderWidth: 1,
    borderColor: Palette.accent,
  },
  notificationSwitchActive: {
    color: Palette.focus,
    backgroundColor: Palette.accent,
  },
  notificationItem: {
    flex: 1,
    paddingVertical: 8,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Palette.bg
  },
  notificationText: {
    flex: 1,
    color: Palette.accentDark,
    paddingHorizontal: 8,
    lineHeight: 18
  },
  notificationMenuIcon: {
    color: Palette.focus,
    padding: 4,
    borderRadius: 4,
    fontSize: 18,
    height: 26,
    width: 26,
    textAlign: 'center'
  },
  notificationMenu: {
    left: 75,
    width: Dimensions.get('window').width - 75,
    height: Dimensions.get('window').height - 64,
    backgroundColor: Palette.focus,
  },
  notificationWrapper: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute', 
    top: 64,
    height: Dimensions.get('window').height - 64,
    width: Dimensions.get('window').width + 10,
    backgroundColor: 'rgba(51,51,51,.8)'
  }
})


const STATUS_BAR_HEIGHT = 64
if (Platform.OS === 'android') {
  var ExtraDimensions = require('react-native-extra-dimensions-android')
  STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT')
}
