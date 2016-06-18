import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'
import { MKColor, MKButton } from 'react-native-material-kit'

import { TText } from './util/baseComponents'
import { GlobalStyles, Palette } from '../styles/global'

export default class Test extends Component {
  render() {
    return (
      <View style={GlobalStyles.wrapper}>
        <MKButton
          {...MKButton.coloredButton().toProps()}
          backgroundColor={Palette.accent}
          shadowOpacity={0}>
          <TText style={[GlobalStyles.text, {color: '#fff', fontWeight: 'bold'}]}>Wat</TText>
        </MKButton>
      </View>
    )
  }
}  
