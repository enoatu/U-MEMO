import 'react-hot-loader/patch';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import styled, { css } from 'styled-components';
import { Provider, Subscribe, Container } from 'unstated';
import UNSTATED from 'unstated-debug'

import Tree from './components/Tree';
import CustomDrawer from './components/Drawer';
import DrawerC from './containers/DrawerC';
import MemoC from './containers/MemoC';
import Memo from './components/Memo';
import 'antd/dist/antd.css';
import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
/***********/
import { AppContainer } from 'react-hot-loader';
/***********/

class Home extends Component {
  render() {
    return <Memo/>;
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.drawer = this.props.drawer;
    this.memo = this.props.memo;
    console.log(this.memo.state.color);
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

        //<div style={S.container}>
  render() {
    return (
      <div>
        <NavBar
        style={{backgroundColor: this.memo.state.color}}
         icon={<Icon type="ellipsis" />}
         onLeftClick={() => this.props.drawer.onSwitch()}
        >
        U-Memo
        </NavBar>
        <CustomDrawer/>
        {this.drawer.state.page == 'HOME' && <Home/>}
      </div>
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

const Export = () => (
  <Subscribe to={[DrawerC, MemoC]}>
    {(drawer,memo) => <App drawer={drawer} memo={memo} />}
  </Subscribe>
);

ReactDOM.render(
  <AppContainer>
    <Provider>
      <Export />
    </Provider>
  </AppContainer>
  , document.getElementById('main')
);
