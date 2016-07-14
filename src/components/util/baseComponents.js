import React, { Component } from 'react'
import {
  StyleSheet,
  Navigator,
  View,
  Text,
  Image,
  Keyboard,
  Dimensions,
  Platform
} from 'react-native'

import { GlobalStyles, Palette } from '../../styles/global'

export class Wrapper extends View {
  constructor(props) {
    super(props)
    this.parent = props.parent || { state: {loaded: true} }
    this.state = {
      visibleHeight: Dimensions.get('window').height - STATUS_BAR_HEIGHT
    }
  }

  componentDidMount() {
    let height = Dimensions.get('window').height - STATUS_BAR_HEIGHT
    this.setState({
      height: Dimensions.get('window').height - STATUS_BAR_HEIGHT
    })

    this.showListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this))
    this.hideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this))
  }

  componentWillUnmount() {
    Keyboard.removeSubscription(this.showListener)
    Keyboard.removeSubscription(this.hideListener)
  }

  _keyboardWillShow(e) {
    let height = Dimensions.get('window').height - STATUS_BAR_HEIGHT - e.endCoordinates.height
    this.setState({visibleHeight: height})
  }

  _keyboardWillHide(e) {
    this.setState({
      visibleHeight: Dimensions.get('window').height - STATUS_BAR_HEIGHT
    })
  }

  render() {
    if (this.parent.state.loaded) {
      return (
        <View style={[
            { height: this.state.visibleHeight, marginTop: STATUS_BAR_HEIGHT },
            styles.wrapper,
            this.props.omitPadding ? { paddingHorizontal: 0 } : null
          ]}>
          {super.render()}
        </View>
      )
    } else {
      return (
        <View style={styles.wrapper}>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 12 }}>
            <Image
              style={styles.loadingImage}
              source={require('../../assets/loading.gif')}/>
          </View>
          <Text style={[GlobalStyles.titleText,
                        { textAlign: 'center', color: Palette.accent }]}>
            hustling.
          </Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  loadingImage: {
    width: 75,
    height: 75
  },
  bodyText: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    color: Palette.text
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Palette.text
  },
  wrapper: {
    // LAYOUT
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,

    // PRESENTATION
    backgroundColor: Palette.bg,
  },
})

const STATUS_BAR_HEIGHT = 64
if (Platform.OS === 'android') {
  var ExtraDimensions = require('react-native-extra-dimensions-android')
  STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT')
}
