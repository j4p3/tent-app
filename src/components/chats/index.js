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
import GlobalStyles from '../../styles/global'

export default class ChatsIndex extends Component {
  constructor(props) {
    super(props);
    var chats = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    })

    this.state = {
      chats: chats.cloneWithRows(seeds)
    }
  }

  _item(item) {
    return (
      <TouchableHighlight
        style={GlobalStyles.itemContainer}
        onPress={Actions.chatsshow}>
        <View style={GlobalStyles.item}>
          <Text style={GlobalStyles.itemTitle}>{item.title}</Text>
          <Text style={GlobalStyles.itemBody}>{item.author}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <GridList
          dataSource={this.state.chats}
          item={this._item}
          action={Actions.chatsshow}/> 
    )
  }
}

const seeds = [
  {
   title: 'Fred Wilson Intro',
   author: 'JP',
   id: '0',
  }, {
   title: 'Beer, stumptown vice 90s shoreditch 3',
   author: 'JP',
   id: '1',
  }, {
   title: 'Wolf moon twee',
   author: 'JP',
   id: '2',
  }, {
   title: 'Readymade chia migas wolf post-ironic. Asymmetrical',
   author: 'JP',
   id: '3',
  }, {
   title: 'VHS meh, tumblr',
   author: 'JP',
   id: '4',
  }, {
   title: 'Typewriter semiotics farm-to-table taxidermy mixtape tacos',
   author: 'JP',
   id: '3',
  }, {
   title: 'Cred butcher blog',
   author: 'JP',
   id: '4',
  }, {
   title: 'Tattooed everyday carry.',
   author: 'JP',
   id: '3',
  }, {
   title: 'Ennui street art pinterest tumblr deep',
   author: 'JP',
   id: '4',
  }
]
