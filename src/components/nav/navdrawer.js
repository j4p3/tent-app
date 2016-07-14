import React, { Component, PropTypes } from 'react'
import Drawer from 'react-native-drawer'
import { DefaultRenderer } from 'react-native-router-flux';

import Navigation from './navigation'
import { Palette } from '../../styles/global'

const propTypes = {
  navigationState: PropTypes.object,
};

class NavDrawer extends Component {
  render(){
    const children = this.props.navigationState.children;
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type='overlay'
        content={<Navigation global={this.props.global} context={this}/>}
        tapToClose={true}
        openDrawerOffset={75}
        closedDrawerOffset={-3}
        panCloseMask={0.2}
        negotiatePan={true}
        tweenDuration={20}
        styles={{
          drawer: { backgroundColor: Palette.bg },
          mainOverlay: { backgroundColor: Palette.text, opacity: 0.0 }
        }}
        tweenHandler={(ratio) => ({
         mainOverlay: { opacity: Math.min(0.8, ratio) }
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