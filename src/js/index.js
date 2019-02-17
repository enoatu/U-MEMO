import 'react-hot-loader/patch';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import styled, { css } from 'styled-Components';
import { Provider, Subscribe, Container } from 'unstated';
import UNSTATED from 'unstated-debug'

import {Tabbar, Tab, Segment, Icon, Page, Toolbar, Button, BackButton, ToolbarButton } from 'react-onsenui';
import Tree from './components/Tree';
import Calendar from './components/Calendar';
import TmpTodo from './components/TmpTodo';
import ForceTodo from './components/ForceTodo';
import CustomDrawer from './components/Drawer';
import DrawerC from './containers/DrawerC';

import 'onsenui/css/onsenui.min.css';
import 'onsenui/css/onsen-css-components.min.css';
import 'antd/dist/antd.css';
/***********/
import { AppContainer } from 'react-hot-loader'
/***********/

class TabPage extends React.Component {
  render() {
    return (
      <Page>
        <Toolbar>
          <div className="center">{this.props.title}</div>
        </Toolbar>
        <TodoWrapper>
          {this.props.title == 'Home' && <TmpTodo/>}
        </TodoWrapper>
      </Page>
    );
  }
}
class AppC extends Container {
  state = {
    index: 0,
    open: false,
  };
}

class Home extends Component {
  render() {
    return <Tree/>;
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  onRenderToolBar() {
    return (
      <Subscribe to={[DrawerC]}>
        {(drawer) => (
          <Toolbar>
            <div className="left">
              <ToolbarButton onClick={() => drawer.onSwitch()}>
                <Icon icon="md-menu" />
              </ToolbarButton>
            </div>
            <div className="center">
            {drawer.state.page}
            </div>
            <div className="right">
            </div>
          </Toolbar>
        )}
      </Subscribe>
    );
  }

  onRenderTabbar() {
    return(
      <Tabbar
        position='bottom'
        initialIndex={1}
        renderTabs={this.renderTabs}
      />
    );
  }

  render() {
    return (
      <Subscribe to={[DrawerC]}>
        {(drawer) => (
          <Page renderToolbar={() => this.onRenderToolBar()}>
            <div style={S.container}>
              <CustomDrawer/>
              {drawer.state.page == 'HOME' && <Home/>}
              {drawer.state.page == 'TODO' && <TmpTodo/>}
              {drawer.state.page == 'FORCE-TODO' && <ForceTodo/>}
              {drawer.state.page == 'CALENDAR' && <Calendar/>}
            </div>
          </Page>
        )}
      </Subscribe>
    );
  }
}

const S = {
  container : {
    margin: "0 auto",
    width: "80%",
  }
};
const TodoWrapper = styled.div`
  width: 80%;
  margin: 50px auto 0 auto;
  max-width: 500px;
`;

const TabbarB = styled.div`
  position: absolute;
  bottom: 0;
  border: solid 1px;
  width: 100%;
`;

const Width = {
  width: '100%',
};
const Center = styled.div`
  text-align: center;
  margin: auto;
  width: 50%;
  height: 20%;
  background-color: green;
`;
const Li = styled.li`
`;
const Ul = styled.ul`
  li{
    background-color: #100;
  }
`;
const Button1 = styled.button`
  height: 30px;
  width:100%;
`;
const Button2 = styled.button`
  height: 30px;
  width:100%;
`;
const Button3 = styled.button`
  height: 30px;
  width:100%;
`;

ReactDOM.render(
  <AppContainer>
    <Provider>
      <App />
    </Provider>
  </AppContainer>
  , document.getElementById('main')
);
