import 'react-hot-loader/patch';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import styled, { css } from 'styled-components';
import { Provider, Subscribe, Container } from 'unstated';
import UNSTATED from 'unstated-debug'

import Tree from './components/Tree';
import CustomDrawer from './components/Drawer';
import Setting from './components/Setting';
import DrawerC from './containers/DrawerC';
import MemoC from './containers/MemoC';
import Memo from './components/Memo';

import { Icon as IconD} from 'antd';
import { Drawer, List, NavBar, Icon } from 'antd-mobile';

import 'antd-mobile/dist/antd-mobile.css';
import 'antd/dist/antd.css';
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

  render() {
    return (
      <div>
        <NavBar
          style={{backgroundColor: this.memo.state.color}}
          leftContent={
            this.drawer.state.page == 'HOME' ?
              <IconD type="menu-unfold" onClick={() => this.drawer.onSwitch()}/>
              :
              <IconD type="left"     onClick={() => this.drawer.setState({page: 'HOME'})}/>
          }
          rightContent={
            this.drawer.state.page == 'HOME' &&
              <IconD type="setting" onClick={() => this.drawer.setState({page: 'SETTING'})}/>
          }
        >
        {this.drawer.state.page}
        </NavBar>
        <CustomDrawer/>
        {this.drawer.state.page == 'HOME' && <Home/>}
        {this.drawer.state.page == 'SETTING' && <Setting/>}
      </div>
    );
  }
}
import {
  Form, Input, Button, Radio,
} from 'antd';

class FormLayoutDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };
  }

  handleFormLayoutChange = (e) => {
    this.setState({ formLayout: e.target.value });
  }

  render() {
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 14, offset: 4 },
    } : null;
    return (
      <div>
        <Form layout={formLayout}>
          <Form.Item
            label="Form Layout"
            {...formItemLayout}
          >
            <Radio.Group defaultValue="horizontal" onChange={this.handleFormLayoutChange}>
              <Radio.Button value="horizontal">Horizontal</Radio.Button>
              <Radio.Button value="vertical">Vertical</Radio.Button>
              <Radio.Button value="inline">Inline</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Field A"
            {...formItemLayout}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            label="Field B"
            {...formItemLayout}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
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
