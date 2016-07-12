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

import { Wrapper } from '../util/baseComponents'
import GridList from '../util/gridlist'
import { GlobalStyles } from '../../styles/global'
import Api from '../../stores/api'

export default class TentsIndex extends Component {
  constructor(props) {
    super(props);

    this._tents = []
    this._store = new Api()

    var tents = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    })

    this.state = {
      tents: tents.cloneWithRows(this._tents)
    }
  }

  componentDidMount() {
    var _this = this
    this._store.tents().then(function (s) {
      _this.setState({ tents: _this.state.tents.cloneWithRows(s) })
    })
  }

  _item(item) {
    return (
      <TouchableHighlight
        style={GlobalStyles.itemContainer}
        onPress={() => { Actions.tentsshow({ tent: item }) }}>
        <View style={GlobalStyles.item}>
          <Text style={GlobalStyles.titleText}>{item.name}</Text>
          <Text style={GlobalStyles.bodyText}>{item.desc}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <Wrapper style={{flex: 1}}>
        <GridList
          dataSource={this.state.tents}
          item={this._item}/>
      </Wrapper>
    )
  }
}
