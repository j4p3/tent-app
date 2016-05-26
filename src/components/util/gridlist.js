import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

export default class GridList extends Component {
  constructor(props) {
    super(props);

    this.item = this.props.item || null
    this.action = this.props.action || null
  
    this.state = {
      dataSource: this.props.dataSource
    };
  }

  render() {
    return (
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        renderRow={this.item.bind(this)}/> 
    )
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  title: {
    fontWeight: 'bold'
  }
})
