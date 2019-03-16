import React from 'react';
import ReactDom from 'react-dom';
import { Provider, Subscribe, Container } from 'unstated';
import { Drawer, Menu, Icon } from 'antd';
import DrawerC from '../containers/DrawerC';
import styled, { css } from 'styled-components';
import Tree from './Tree';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class CustomDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.drawer = this.props.drawer;
  }
  render() {
    return (
      <Drawer
        onClose={this.drawer.onClose}
        visible={this.drawer.state.open}
        placement={'left'}
        width={300}
      >
      <Tree/>
      </Drawer>
    );
  }
}

const DrawerStyle = {
  minWidth: '250px',
};

const Export = () => (
  <Subscribe to={[DrawerC]}>
    {drawer => <CustomDrawer drawer={drawer} />}
  </Subscribe>
);
export default Export;

