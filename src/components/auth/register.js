import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform
} from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'
import { MKButton, MKTextField } from 'react-native-material-kit'
import ImagePicker from 'react-native-image-picker'

import { GlobalStyles, Palette } from '../../styles/global'
import Api from '../../stores/api'
import S3 from '../../stores/s3'
import { Wrapper } from '../util/baseComponents'

export default class Register extends Component {
  constructor(props) {
    super(props)
  
    let signup = props.hasOwnProperty('signup') ? props.signup : false
    this._store = new Api()
    this._s3 = new S3()

    step: [
      'login',
      'createName',
      'createImage'
    ]
    this.state = {
      name: '',
      avatar: '',
      email: 'api_user@unqualified.io',
      password: 'password',
      steps: [
        'login',
        'createName',
        'createImage'
      ],
      step: 'login',
      error: ''
    };
  }

  /***************************************************************************/
  // State manipulation utilities
  /***************************************************************************/

  _advanceStep() {
    let stepIndex = this.state.steps.indexOf(this.state.step)
    this.setState({step: this.state.steps[stepIndex + 1]})
  }

  _backStep() {
    let stepIndex = this.state.steps.indexOf(this.state.step)
    this.setState({step: this.state.steps[stepIndex - 1]})
  }

  _handleError(e) {
    e = e || 'That didn\'t work, sorry.'
    this.setState({ error: e })
  }

  /***************************************************************************/
  // Auth & storage methods
  /***************************************************************************/

  _selectImage() {
    // @todo use integration images
    // @todo resize image before upload

    var options = {
      title: 'select your image.',
      cameraType: 'front',
      quality: 0.25,
      storageOptions: { 
        skipBackup: true, 
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        this.setState({ error: 'Image problem: ' + response.error })
      } else {
        this.setState({ avatarSource: response })
        this._updateImage()
      }
    });
  }

  _updateImage() {
    let _this = this
    this._s3.upload(_this.state.avatarSource, this.state.avatarStorage)
      .then(r => {
        if (!r.error) {
          _this.props.global.setState({
            user: {
              id: _this.state.userId,
              name: _this.state.name,
              email: _this.state.email,
              avatar: r.location
            }
          })

          _this._store.updateUser({
            id: _this.state.userId,
            avatar: r.location
          }).then(u => {
              if (!u.error) {
                Actions.root({ title: u.root_tents_and_descendants[0].name })
              } else {
                _this._handleError()
              }
            })
        } else {
          _this._handleError('The image didn\'t upload - try again?')
        }
      })
  }

  _updateName() {
    let _this = this
    this._store.updateUser({
      id: this.props.global.state.user.id,
      name: this.state.name
    }).then(function (r) {
      if (!r.error) {
        _this.props.global.setState({
          user: {
            name: r.name,
            email: r.email,
            id: r.id
          },
          tents: r.root_tents_and_descendants[0]
        })
      } else {
        _this._handleError()
      }
    })
  }

  _createAccount() {
    let _this = this

    // account creation
    this._store.signup({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then(function (r) {
      if (!r.error) {

        _this.setState({
          userId: r.id,
          avatarStorage: r.avatar_storage
        })

        _this.props.global.setState({
          user: {
            name: r.name,
            email: r.email,
            id: r.id
          },
          tents: r.root_tents_and_descendants[0]
        })
      } else {
        _this._handleError('That didn\'t work, sorry. Has an account already been created with this email?')
      }
    })
  }

  _authenticate() {
    let _this = this

    this._store.authenticate({
      email: this.state.email,
      password: this.state.password
    }).then(function (r) {
      if (!r.error) {
        _this.props.global.setState({
          user: {
            name: r.name,
            email: r.email,
            id: r.id,
            avatar: r.avatar
          },
          tents: r.root_tents_and_descendants[0]
        })
        Actions.root({ title: r.root_tents_and_descendants[0].name })
        // @todo make a global response handler object & overwrite the 'ok' condition
      } else if (r.error) { _this.setState({error: r.error, password: ''})
      } else { _this.setState({error: 'Server error.', password: ''}) }
    })
  }

  /***************************************************************************/
  // Templates & rendering
  /***************************************************************************/

  _createImage() {

    // @todo find a way to call the imagepicker once on entering, or on button press.
    // probably this means setting up tabs.

    return (
      <Wrapper>
        <Text style={[GlobalStyles.bodyText, GlobalStyles.vSpace, { textAlign: 'center' }]}>{this.state.error}</Text>
        <Text style={[GlobalStyles.titleText,
                      { textAlign: 'center' }]}>
          hey {this.state.name}.
        </Text>
        <Text style={[GlobalStyles.titleText,
                      GlobalStyles.vSpace,
                      { textAlign: 'center' }]}>
          select your image:
        </Text>

        <View style={GlobalStyles.vSpace}><MKButton
        {...MKButton.coloredButton().toProps()}
        backgroundColor={Palette.accent}
        shadowOpacity={0}
        onPress={() => { this._selectImage() }}>
          <Text style={[GlobalStyles.titleText, { color: Palette.focus }]}>
          pick image
          </Text></MKButton></View>

        <View style={GlobalStyles.vSpace}><MKButton
        {...MKButton.coloredButton().toProps()}
        backgroundColor={Palette.neutral}
        shadowOpacity={0}
        onPress={() => { this._backStep() }}>
          <Text style={[GlobalStyles.titleText, { color: Palette.text, backgroundColor: Palette.neutral }]}>
          go back
          </Text></MKButton></View>
      </Wrapper>
    )
  }

  _createName() {
    return (
      <Wrapper>
        <Text style={[GlobalStyles.bodyText, GlobalStyles.vSpace, { textAlign: 'center' }]}>{this.state.error}</Text>
        <Text style={[GlobalStyles.titleText, { textAlign: 'center' }]}>
          great, what's your name?
        </Text>
        <View style={GlobalStyles.vSpace}><MKTextField
            tintColor={Palette.text}
            textInputStyle={[GlobalStyles.text, { color: '#000' }]}
            highlightColor={Palette.accent}
            underlineSize={2}
            placeholder='name'
            value={this.state.name}
            onChangeText={(t) => {
              this.setState({name: t})
            }}
          /></View>
          <View style={GlobalStyles.vSpace}><MKButton
          {...MKButton.coloredButton().toProps()}
          backgroundColor={Palette.accent}
          shadowOpacity={0}
          onPress={() => {
            this._updateName()
            this._advanceStep()
          }}>
            <Text style={[GlobalStyles.titleText, { color: Palette.focus }]}>
            get started
            </Text></MKButton></View>

          <View style={GlobalStyles.vSpace}><MKButton
          {...MKButton.coloredButton().toProps()}
          backgroundColor={Palette.neutral}
          shadowOpacity={0}
          onPress={() => { this._backStep() }}>
            <Text style={[GlobalStyles.titleText, { color: Palette.text, backgroundColor: Palette.neutral }]}>
            go back
            </Text></MKButton></View>
      </Wrapper>
    )
  }

  _login() {
    return (
      <Wrapper>
        <Text style={[GlobalStyles.bodyText, GlobalStyles.vSpace, { textAlign: 'center' }]}>{this.state.error}</Text>
        <Text style={[GlobalStyles.titleText, GlobalStyles.vSpace, { textAlign: 'center' }]}>
          hi, who are you?</Text>

        
        <View style={GlobalStyles.vSpace}><MKTextField
            tintColor={Palette.text}
            keyboardType='email-address'
            autoCapitalize='none'
            textInputStyle={[GlobalStyles.text, { color: '#000' }]}
            highlightColor={Palette.accent}
            underlineSize={2}
            placeholder='email'
            value={this.state.email}
            onChangeText={(t) => {
              this.setState({email: t})
            }}
          /></View>
        <View style={GlobalStyles.vSpace}><MKTextField
          tintColor={Palette.text}
          textInputStyle={[GlobalStyles.text, { color: '#000' }]}
          highlightColor={Palette.accent}
          underlineSize={2}
          placeholder='password'
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(t) => {
            this.setState({password: t})
          }}
        /></View>

        <View style={GlobalStyles.vSpace}><MKButton
          {...MKButton.coloredButton().toProps()}
          backgroundColor={Palette.accent}
          shadowOpacity={0}
          onPress={() => { this._authenticate(); }}>
            <Text style={[GlobalStyles.titleText, { color: Palette.focus }]}>
            login</Text></MKButton></View>
        <Text style={[GlobalStyles.bodyText, { textAlign: 'center' }]}>
          or</Text>
        <View style={GlobalStyles.vSpace}><MKButton
          {...MKButton.coloredButton().toProps()}
          backgroundColor={Palette.accent}
          shadowOpacity={0}
          onPress={() => {
            this._createAccount()
            this._advanceStep()
          }}>
            <Text style={[GlobalStyles.titleText, { color: Palette.focus }]}>
            create account</Text></MKButton></View>
      </Wrapper>
    )
  }

  render() {
    return this['_' + this.state.step].call(this)
  }
}
