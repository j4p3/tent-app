import React from 'react';
import {PropTypes} from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking
} from "react-native";
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

import GlobalStyles from '../../styles/global'
import Break from '../util/break'
import Api from '../../stores/api'

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 10
  },
});

const TabView = (props, context) => {
  const drawer = context.drawer;
  this.api = new Api()

  return (
    <View style={[styles.container, props.sceneStyle]}>
    <Button 
      containerStyle={[GlobalStyles.buttonContainer, GlobalStyles.vSpace]}
      style={[GlobalStyles.text, GlobalStyles.buttonInterior]}
      onPress={() => { drawer.close(); Actions.tentsindex(); }}>
      Go Home</Button>
      <Text style={GlobalStyles.itemTitle}>You're browsing the Tent demo.</Text>
      <Text>Thanks for checking it out! This is still just a skeleton, but watch this space. Every week new features come online.</Text>
      <Break/>
      <Text>What should be in the next build?</Text>
      <Button 
        containerStyle={[GlobalStyles.buttonContainer, GlobalStyles.vSpace, GlobalStyles.buttonMuted]}
        style={[GlobalStyles.text, GlobalStyles.buttonInterior]}
        onPress={() => {
          this.api.vote({
            // name: this.props.global.state.store.name,
            val: 'A'
          });
          drawer.close();
          Actions.tentsindex(); }}>
        A) Sexy interface design!</Button>
      <Button 
        containerStyle={[GlobalStyles.buttonContainer, GlobalStyles.vSpace, GlobalStyles.buttonMuted]}
        style={[GlobalStyles.text, GlobalStyles.buttonInterior]}
        onPress={() => {
          this.api.vote({
            // name: this.props.global.state.store.name,
            val: 'B'
          });
          drawer.close();
          Actions.tentsindex(); }}>
        B) Social capital tracking!</Button>
      <Button 
        containerStyle={[GlobalStyles.buttonContainer, GlobalStyles.vSpace, GlobalStyles.buttonMuted]}
        style={[GlobalStyles.text, GlobalStyles.buttonInterior]}
        onPress={() => {
          this.api.vote({
            // name: this.props.global.state.store.name,
            val: 'C'
          });
          drawer.close();
          Actions.tentsindex(); }}>
        C) Nested tent navigation!</Button>
      <Button 
        containerStyle={[GlobalStyles.buttonContainer, GlobalStyles.vSpace, GlobalStyles.buttonMuted]}
        style={[GlobalStyles.text, GlobalStyles.buttonInterior]}
        onPress={() => {
          Linking.openUrl('mailto:bonnerjp@gmail.com')
          drawer.close(); }}>
        D) Email something else.</Button>
    </View>
  );
};

TabView.contextTypes = contextTypes;
TabView.propTypes = propTypes;

export default TabView;
