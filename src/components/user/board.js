import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight,
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

import GridList from '../util/gridlist'
import { Wrapper } from '../util/baseComponents'
import { GlobalStyles, Palette } from '../../styles/global'
import Api from '../../stores/api'

export default class Board extends Component {
  constructor(props) {
    super(props)

    this._store = new Api()

    var events = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    })
    this._events = []

    this._content = {
      'interaction': function (item) {
        return 'New ' + item.type_content.interaction_type + '!'
      },
      'message': function (item) {
        return '"' + item.type_content.last_message+ '"'
      },
      'post': function (item) {
        return item.post.content
      }
    }

    this.state = {
      loaded: false,
      events: events,
    }
  }

  componentDidMount() {
    // @todo grab posts and messages, too
    var _this = this
    this._store.events(this.props.global.state.user).then(function (s) {
      s.map(e => e.payload = _this._content[e.type](e))
      _this._setEvents(s)
      _this.setState({loaded: true})
    })
  }

  _setEvents(events) {
    this._events = this._events.concat(events)
    this.setState({
      events: this.state.events.cloneWithRows(this._events)
    })
  }

  _item(item) {
    // @todo char limit headlines
    return (
      <TouchableHighlight
        style={GlobalStyles.itemContainer}
        onPress={() => { Actions.postsshow({
          title: item.user.name + "'s post",
          post: item.post })
        }}>
        <View style={GlobalStyles.item}>
          <Text style={GlobalStyles.titleText}>
            {item.post.headline}
          </Text>
          <Text style={GlobalStyles.bodyText}>
            {item.user.email}
          </Text>
          <Text style={GlobalStyles.bodyText}>
            {item.payload}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    // @todo figure out why style needs to be inlined for Wrapper?
    return (
      <Wrapper style={{flex: 1}} parent={this}>
        <GridList
          dataSource={this.state.events}
          item={this._item}/>
        <ActionButton buttonColor="rgba(72, 167, 112, 1)">
          <ActionButton.Item
            buttonColor='#9b59b6'
            title="New Post"
            onPress={() => { Actions.postsnew({ tent: this.props.tent }) }}>
            <Icon name="md-create" style={GlobalStyles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </Wrapper>
    )
  }
}
