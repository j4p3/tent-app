import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

import { GlobalStyles, Palette } from '../../styles/global'
import Break from '../util/break'

export default class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _itemize(tent, depth) {
    var tabs = new Array(depth+1).join('0').split('')

    return (
      <Button
        key={tent.id}
        containerStyle={[styles.row, { backgroundColor: Palette.bg }]}
        style={[styles.rowButton, GlobalStyles.text, { color: Palette.accentDark, textAlign: 'left', fontSize: 12 }]}
        onPress={() => {
          this.props.context._drawer.close()
          Actions.tentsshow({ tent: tent, title: tent.name })
        }}>
        { tabs.map((t, i) => (<Text key={i} style={styles.tab}></Text>) )}
        {tent.name}</Button>
    )
  }

  _nest(tent, tents=[], depth=0) {
    tent = Object.assign({children : []}, tent)
    tents.push(this._itemize(tent, depth))
    tent.children.map(t => this._nest(t, tents, depth + 1))
    return tents
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={[GlobalStyles.text, { margin: 6 }]}>
            You're browsing the tent demo for {this.props.global.state.tents.name}.
          </Text>
          <Text style={[GlobalStyles.text, { margin: 6 }]}>Visit a tent:</Text>
        </View>

        {this._nest(this.props.global.state.tents)}

        <Text style={[GlobalStyles.text, { fontSize: 14, padding: 20 }]}>
          Thanks for checking out this demo! We're still just a skeleton, but new stuff comes online every week.
        </Text>
        <Text style={[GlobalStyles.text, { fontSize: 14, padding: 20 }]}>
          What should be in next week's build?
        </Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={[GlobalStyles.text, { fontSize: 14, paddingLeft: 20 }]}>{'\u2022'} </Text>
          <Text style={[GlobalStyles.text, { fontSize: 14 }]}>
          Social Capital & Rewards</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={[GlobalStyles.text, { fontSize: 14, paddingLeft: 20 }]}>{'\u2022'} </Text>
          <Text style={[GlobalStyles.text, { fontSize: 14 }]}>
          Embedded content in chat (emojis and gifs!)</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={[GlobalStyles.text, { fontSize: 14, paddingLeft: 20 }]}>{'\u2022'} </Text>
          <Text style={[GlobalStyles.text, { fontSize: 14, flex: 1 }]}>
          More specific interactions ("you should talk to X!")</Text>
        </View>
        <Text style={[GlobalStyles.text, { fontSize: 14, padding: 20 }]}>
          Let me know what you think!
        </Text>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    overflow: 'hidden'
  },
  tab: {
    width: 30
  },
  name: {
    color: '#F5FCFF',
    fontSize: 16
  },
  row: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    paddingLeft: 30,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dcdce0',
    justifyContent: 'flex-start'
  },
  rowButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
})
