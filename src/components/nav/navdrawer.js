import React, { Component, PropTypes } from 'react'
import Drawer from 'react-native-drawer'
import { DefaultRenderer } from 'react-native-router-flux';

import TabView from './tabview'
import Navigation from './navigation'

const propTypes = {
  navigationState: PropTypes.object,
};

class NavDrawer extends Component {
  render(){
    const children = this.props.navigationState.children;
    return (
      <Drawer
        ref='navigation'
        type='overlay'
        content={<Navigation global={this.props.global}/>}
        tapToClose={true}
        openDrawerOffset={0.2}
        closedDrawerOffset={-3}
        panCloseMask={0.2}
        negotiatePan={true}
        tweenDuration={100}
        styles={{
          drawer: { backgroundColor: '#2b303b', shadowColor: '#2b303b', shadowOpacity: 0.8, shadowRadius: 12},
        }}
        tweenHandler={(ratio) => ({
         main: { opacity: Math.max(0.54,1-ratio) }
      })}>
        <DefaultRenderer
          navigationState={children[0]}
          onNavigate={this.props.onNavigate}/>
      </Drawer>
    );
  }
}

NavDrawer.propTypes = propTypes;

export default NavDrawer