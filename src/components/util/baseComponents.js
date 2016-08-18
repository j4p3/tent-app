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
      visibleHeight: Dimensions.get('window').height - STATUS_BAR_HEIGHT,
      keyboardHeight: 0
    }
  }

  componentDidMount() {
    let height = Dimensions.get('window').height - STATUS_BAR_HEIGHT
    this.setState({
      visibleHeight: Dimensions.get('window').height - STATUS_BAR_HEIGHT,
      keyboardHeight: 0
    })

    this.showListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this))
    this.showedListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this))
    this.hideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this))
  }

  componentWillUpdate(props, state) {
    console.log('componentWillUpdate')
    console.log(state)
  }

  componentDidUpdate(props, state) {
    console.log('componentDidUpdate')
    console.log(state)
  }

  componentWillUnmount() {
    Keyboard.removeSubscription(this.showListener)
    Keyboard.removeSubscription(this.showedListener)
    Keyboard.removeSubscription(this.hideListener)
  }

  _keyboardWillShow(e) {
    console.log('_keyboardWillShow')
    console.log(e.endCoordinates)
    let height = Dimensions.get('window').height - STATUS_BAR_HEIGHT - e.endCoordinates.height
    this.setState({
      visibleHeight: height,
      keyboardHeight: e.endCoordinates.height
    })
  }

  _keyboardDidShow(e) {
    console.log('_keyboardDidShow')
    console.log(e.endCoordinates)
  }

  _keyboardWillHide(e) {
    console.log('_keyboardWillHide')
    console.log(e.endCoordinates)
    this.setState({
      visibleHeight: Dimensions.get('window').height - STATUS_BAR_HEIGHT,
      keyboardHeight: 0
    })
  }

  render() {
    if (this.parent.state.loaded) {
      return (
        <View
        keyboardShouldPersistTaps={false}
          style={[
            styles.wrapper,
            { height: this.state.visibleHeight,
              marginTop: STATUS_BAR_HEIGHT },
            this.props.omitPadding ? { paddingHorizontal: 0 } : null,
            this.props.center ? { justifyContent: 'center' } : null
          ]}>
          {super.render()}
        </View>
      )
    } else {
      return (
        <View style={[
          styles.wrapper,
          { height: this.state.visibleHeight,
            marginTop: STATUS_BAR_HEIGHT,
            justifyContent: 'center' }]}>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 12 }}>
            <Image
              style={styles.loadingImage}
              source={require('../../assets/loading.gif')}/>
          </View>
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
    // flex: 1,
    flexDirection: 'column',
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
