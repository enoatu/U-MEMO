import React from 'react';
import ReactDom from 'react-dom';
import { Provider, Subscribe, Container } from 'unstated';
import { Drawer, Menu, Icon } from 'antd';
import Tree from 'react-ui-tree';
import DrawerC from '../containers/DrawerC';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class CustomDrawer extends React.Component {
  renderNode = node => {
    return (
      <span
        onClick={this.onClickNode.bind(null, node)}
      >
        {node.module}
      </span>
    );
  };
  render() {
              //onChange={this.handleChange}
      //

    return (
      <Subscribe to={[DrawerC]}>
        {(drawer) => (
          <div>
            <Drawer
              onClose={drawer.onClose}
              visible={drawer.state.open}
              placement={'left'}
            >
            <Tree
              paddingLeft={20}
              tree={drawer.state.tree}
              renderNode={this.renderNode}
            />

            </Drawer>
          </div>
        )}
      </Subscribe>
    );
  }
}
