import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import { GlobalStyles } from '../../styles/global'

export default class GridList extends Component {
  constructor(props) {
    super(props)

    this.item = props.item || this._item
    this.action = props.action || null
    this.props.content = props.content || {}
  
    this.state = {
      dataSource: props.dataSource
    };
  }

  _item(item) {
    return (
      <TouchableHighlight
        style={GlobalStyles.itemContainer}
        onPress={() => { Actions.tentsshow({ tent: item }) }}>
        <View style={[GlobalStyles.itemLayout, GlobalStyles.itemPresentation]}>
          <Text style={GlobalStyles.titleText}>{item.name}</Text>
          <Text style={GlobalStyles.bodyText}>{item.desc}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <ListView
        enableEmptySections={true}
        contentContainerStyle={styles.list}
        dataSource={this.props.dataSource}
        renderRow={this.item.bind(this)}/> 
    )
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  title: {
    fontWeight: 'bold'
  }
})
