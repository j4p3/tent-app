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
import { GlobalStyles } from '../../styles/global'
import Api from '../../stores/api'

export default class PostsIndex extends Component {
  constructor(props) {
    super(props);

    this.tentId = props.tentId
    this._posts = []
    this._store = new Api()

    var postData = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    })
    this.state = {
      posts: postData.cloneWithRows(this._posts),
    };

  }

  componentDidMount() {
    var _this = this

    this._store.posts(this.tentId).then(function (s) {
      _this.setState({ posts: _this.state.posts.cloneWithRows(s) })
    })
  }

  _handleReceive(posts = {}) {
    // @todo drag-to-refresh
    // @todo notify on new
    var postArr = []

    for (p in posts) {
      // convert object to array for ListView component
      postArr.push(Object.assign({}, posts[p], { id: p }))
    }

    return postArr.reverse()
  }

  _setPosts(posts) { 
    this._posts = posts
    this.setState({ posts: this.state.posts.cloneWithRows(posts) });
  }

  _item(item) {
    return (
      <TouchableHighlight
        style={GlobalStyles.itemContainer}
        onPress={() => { Actions.postsshow({ post: item }) }}>
        <View style={GlobalStyles.item}>
          <Text style={GlobalStyles.itemTitle}>{item.headline}</Text>
          <Text style={GlobalStyles.itemBody}>{item.content}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <GridList
          dataSource={this.state.posts}
          item={this._item}/> 
    )
  }
}

