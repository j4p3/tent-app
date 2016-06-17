import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux';

import GlobalStyles from '../../styles/global'
import Break from '../util/break'

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _itemize(tent, depth) {
    var tabs = new Array(depth+1).join('0').split('')

    return (
      <Button
        key={tent.id}
        containerStyle={styles.row}
        style={styles.name}
        onPress={() => {
          // @todo retrieve context
          // this.context.drawer.close();
          Actions.tentsshow({ tent: tent })  
        }}>
        { tabs.map((t, i) => (<Text key={i} style={styles.tab}></Text>) )}
        {tent.name}</Button>
    )
  }

  _nest(tent, tents=[], depth=0) {
    tents.push(this._itemize(tent, depth))
    tent.children.map(t => this._nest(t, tents, depth + 1))
    return tents
  }

  render() {
    console.log()
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={{backgroundColor: '#212735', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#151B2A'}}>
          <Text style={[styles.name, { margin: 6 }]}>Tents about {this.props.global.state.tents.name}:</Text>

        </View>

        {this._nest(this.props.global.state.tents)}

        <Text style={[styles.name, { fontSize: 12, padding: 20 }]}>
          You're browsing the tent demo.
        </Text>
        <Text style={[styles.name, { fontSize: 12, padding: 20 }]}>
          Thanks for checking it out! This is still just a skeleton, but watch this space. Every week new features come online.
        </Text>
        <Text style={[styles.name, { fontSize: 12, padding: 20 }]}>
          What should be in next week's build?
        </Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={[styles.name, { fontSize: 12, paddingLeft: 20 }]}>{'\u2022'} </Text>
          <Text style={[styles.name, { fontSize: 12 }]}>
          Social Capital & Rewards</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={[styles.name, { fontSize: 12, paddingLeft: 20 }]}>{'\u2022'} </Text>
          <Text style={[styles.name, { fontSize: 12 }]}>
          Embedded content in chat (emojis and gifs!)</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={[styles.name, { fontSize: 12, paddingLeft: 20 }]}>{'\u2022'} </Text>
          <Text style={[styles.name, { fontSize: 12, flex: 1 }]}>
          More specific interactions ("you should talk to X!")</Text>
        </View>
        <Text style={[styles.name, { fontSize: 12, padding: 20 }]}>
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
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 8,
    paddingLeft: 30,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#3A414E',
    borderTopColor: '#474E5D',
    borderBottomColor: '#212735',
    borderRightColor: '#212735'
  }
})

var seeds = [{
    name: 'Foo',
    id: 1,
    children: [{
        name: 'Bar',
        id: 2,
        children: []
      },
      {
        name: 'Baz',
        id: 3,
        children: [{
          name: 'Qux',
          id: 4,
          children: []
        }]
      },
      {
        name: 'Wat',
        id: 5,
        children: []
      }
    ]
  }
]
