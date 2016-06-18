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
import { GlobalStyles, Palette } from '../../styles/global'
import Api from '../../stores/api'

export default class Board extends Component {
  constructor(props) {
    super(props);

    this._tents = []
    this._store = new Api()

    var interactions = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    })

    this._interactions = []
    this.state = {
      interactions: interactions.cloneWithRows(this._tents)
    }
  }

  componentDidMount() {
    // @todo grab posts and messages, too
    var _this = this
    this._store.interactions({user_id: this.props.global.state.store.id}).then(function (s) {
      _this._setInteractions(_this._processInteractions(s))
    })

    this._store.posts(1).then(function (s) {
      _this._setInteractions(_this._processPosts(s))
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

  _setInteractions(interactions) {
    this._interactions = this._interactions.concat(interactions)
    this.setState({
      interactions: this.state.interactions.cloneWithRows(this._interactions)
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
          <Text style={GlobalStyles.itemTitle}>{item.post.headline}</Text>
          <Text style={GlobalStyles.itemBody}>Author: {item.user.name}</Text>
          <Text style={GlobalStyles.itemBody}>Tent: {item.tent.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={GlobalStyles.wrapper}>
        <GridList
          dataSource={this.state.interactions}
          item={this._item}/>
      </View>
    )
  }
}
