import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View
} from 'react-native'

import ChatView from '../util/chatview'

var ChatsShow = React.createClass({
  getInitialState() {
    var items = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.name !== r2.name || r1.content !== r2.content,
    })

    return {
      items: items.cloneWithRows(seeds),
      _items: seeds
    }

  },

  _handleTextChange(e) {
    this.state._items = this.state._items.concat({
      name: 'You', content: e.nativeEvent.text
    })
    this.setState({
      items: this.state.items.cloneWithRows(this.state._items)
    })
  },

  item(item) {
    return (
      <View style={styles.item}>
        <Text style={styles.name}>{item.name}: </Text>
        <Text>{item.content}</Text>
      </View>
    )
  },

  render() {
    return (
      <View>
        <Text>Chats: show</Text>
        <ChatView
          style={styles.chat}
          dataSource={this.state.items}
          renderRow={this.item}
          initialListSize={this.state.items.length}
        />
        <TextInput
          style={styles.input}
          returnKeyType='go'
          onSubmitEditing={this._handleTextChange}
        />
      </View>
    )
  },
})

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row'
  },
  name: {
    fontWeight: 'bold'
  },
  chat: {
    height: 300
  },
  input: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
    marginBottom: 5,
    height: 20
  }
})

const seeds = [
  { name: 'foo', content: 'bar' },
  { name: 'hammock next', content: 'level cred' },
  { name: 'skateboard godard', content: 'thundercats gastropub' },
  { name: 'four loko', content: 'heirloom pabst' },
  { name: 'franzen chia', content: 'Authentic bitters' },
  { name: 'crucifix leggings', content: 'VHS Selvage' },
  { name: 'biodiesel twee', content: 'salvia dreamcatcher' },
  { name: 'food truck', content: 'venmo XOXO' },
  { name: 'Hashtag locavore', content: 'kogi roof' },
  { name: 'party wayfarers', content: 'fingerstache Disrupt' },
  { name: 'squid man', content: 'braid fixie' },
  { name: 'artisan freegan', content: 'tilde hashtag' },
  { name: 'poutine slow-carb', content: 'single-origin coffee' },
  { name: 'Lofi chartreuse', content: 'squid affogato' },
  { name: 'sriracha intelligentsia', content: 'man braid' },
  { name: 'messenger bag', content: 'four loko' },
  { name: 'yuccie sartorial', content: 'YOLO hashtag' },
  { name: 'tryhard Four', content: 'loko slow-carb' },
  { name: 'ethical chia', content: 'selvage mixtape' },
  { name: 'umami franzen', content: 'migas tousled' },
  { name: 'locavore offal', content: 'chicharrones' },
  { name: 'tryhard venmo', content: 'XOXO' },
  { name: 'biodiesel twee', content: 'salvia dreamcatcher' },
  { name: 'food truck', content: 'venmo XOXO' },
  { name: 'Hashtag locavore', content: 'kogi roof' },
  { name: 'party wayfarers', content: 'fingerstache Disrupt' },
  { name: 'squid man', content: 'braid fixie' },
  { name: 'artisan freegan', content: 'tilde hashtag' },
  { name: 'poutine slow-carb', content: 'single-origin coffee' },
  { name: 'skateboard godard', content: 'thundercats gastropub' },
  { name: 'four loko', content: 'heirloom pabst' },
  { name: 'franzen chia', content: 'Authentic bitters' },
  { name: 'crucifix leggings', content: 'VHS Selvage' },
  { name: 'biodiesel twee', content: 'salvia dreamcatcher' },
  { name: 'food truck', content: 'venmo XOXO' }
]

module.exports = ChatsShow