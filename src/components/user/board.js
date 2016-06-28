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

import GridList from '../util/gridlist'
import { Wrapper } from '../util/baseComponents'
import { GlobalStyles, Palette } from '../../styles/global'
import Api from '../../stores/api'

export default class Board extends Component {
  constructor(props) {
    super(props);

    this._store = new Api()

    var interactions = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    })
    var messages = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    })
    var posts = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    })
    this._interactions = []
    this._messages = []
    this._posts = []

    this.state = {
      loaded: false,
      interactions: interactions,
      messages: messages,
      posts: posts,
    }
  }

  componentDidMount() {
    // @todo grab posts and messages, too
    var _this = this
    console.log(this.props.global.state.user)
    this._store.events(this.props.global.state.user).then(function (s) {
      _this._setInteractions(_this._processInteractions(s.interactions))
      _this._setMessages(_this._processMessages(s.messages))
      _this._setPosts(_this._processPosts(s.posts))
      _this.setState({loaded: true})
    })
  }

  _processInteractions(interactions) {
    var base = {
      post: {},
      tent: {},
      user: {},
      type: {}
    }

    // @todo figure out how to use spread here
    return interactions.map(i => Object.assign({}, base, i))
  }

  _processPosts(posts) {
    var base = {
      post: {},
      tent: {},
      user: {},
      type: {}
    }

    // @todo figure out how to use spread here
    return posts.map(i => Object.assign({}, base, {
      post: {
        headline: i.headline
      },
      type: {
        name: 'Post'
      }
    }, i))
  }

  _processMessages(messages) {
    var base = {
      post: {},
      tent: {},
      user: {},
      type: {}
    }

    return messages
  }

  _setPosts(posts) {
    this._posts = this._posts.concat(posts)
    this.setState({
      posts: this.state.posts.cloneWithRows(this._posts)
    })
  }

  _setInteractions(interactions) {
    this._interactions = this._interactions.concat(interactions)
    this.setState({
      interactions: this.state.interactions.cloneWithRows(this._interactions)
    })
    
  }

  _setMessages(messages) {
    this._messages = this._messages.concat(messages)
    this.setState({
      messages: this.state.messages.cloneWithRows(this._messages)
    })
  }

  _item(item) {
    // expects = {
    //   post: post,
    //   tent: tent,
    //   user: user
    //   type: yeah
    // }
    return (
      <TouchableHighlight
        style={GlobalStyles.itemContainer}
        onPress={() => { Actions.tentsshow({ tent: item.tent }) }}>
        <View style={GlobalStyles.item}>
          <Text style={GlobalStyles.itemTitle}>
            {item.post.headline}
          </Text>
          <Text style={GlobalStyles.itemBody}>
            {item.user.email}
          </Text>
          <Text style={GlobalStyles.itemBody}>
            {item.tent.name}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    // @todo figure out why style needs to be inlined for Wrapper?
    return (
      <Wrapper style={{flex: 1}} loaded={this.state.loaded}>
        <Text>New Interactions on my posts</Text>
        <ListView
          dataSource={this.state.interactions}
          renderRow={(r) => <Text>{r.post.headline}: new {r.interaction_type.name} from {r.user.email}!</Text>} />
        <Text>New messages in posts I'm following</Text>
        <ListView
          dataSource={this.state.messages}
          renderRow={(r) => <Text>{r.headline}: "{r.last.text}"</Text>} />
        <Text>New posts in tents I belong to</Text>
        <ListView
          dataSource={this.state.posts}
          renderRow={(r) => <Text>{r.headline} - {r.user.email}</Text>} />
      </Wrapper>
    )
  }
}

//          <GridList
//           dataSource={this.state.interactions}
//           item={this._item}/>
