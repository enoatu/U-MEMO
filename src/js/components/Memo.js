import React from 'react';
import ReactDom from 'react-dom';
import { Provider, Subscribe, Container } from 'unstated';
import { Drawer, Menu, Icon } from 'antd';
import Tree from 'react-ui-tree';
import MemoC from '../containers/MemoC';

export default class Memo extends React.Component {
  return (
    <Subscribe to={[MemoC]}>
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
