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

export default class TentsIndex extends Component {
  constructor(props) {
    super(props);
    var tents = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    })

    this.state = {
      tents: tents.cloneWithRows(seeds)
    }
  }

  _item(item) {
    return (
      <TouchableHighlight
        style={GlobalStyles.itemContainer}
        onPress={this.action}>
        <View style={GlobalStyles.item}>
          <Text style={GlobalStyles.itemTitle}>{item.name}</Text>
          <Text style={GlobalStyles.itemBody}>{item.desc}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={GlobalStyles.wrapper}>
        <GridList
          dataSource={this.state.tents}
          item={this._item}
          action={Actions.tentsshow}/>
      </View>
    )
  }
}

const seeds = [
  {
   name: 'WeWork Labs',
   id: '0',
   desc: 'Labs members, CMs, advisors, and vendors.'
  }, {
   name: 'Dogs',
   id: '1',
   desc: 'Just a test record.'
  }, {
   name: 'Cats',
   id: '2',
   desc: 'Just a test record.'
  }, {
   name: 'Trad Climbing',
   id: '3',
   desc: 'Just a test record.'
  }, {
   name: 'Venezualen snail racing discussion',
   id: '4',
   desc: '¡Olé!'
  }
]
