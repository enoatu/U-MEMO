'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { Subscribe } from 'unstated';
import MemoC from '../containers/MemoC';

import { Input, Select } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;

import styled, { css, keyframes } from 'styled-components';
import SimpleTreeView from './TreeView';

export default class Tree extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type: null,
      input: null,
    };
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.treeRef = React.createRef();
   // this.onToggle = this.onToggle.bind(this);
  }
   componentDidMount() {
 //   this.initData();
  }

//  initData() {
//    (async () => {
//      const result =  await storage.getItem('@Memo:key');
//      if (result == null) return;
//      console.log('success', result);
//      const data = JSON.parse(result);
//      this.setState({data: data});
//    })();
//  }
  onRadioChange(e) {
    this.setState({
      type: e.target.type,
    });
  }
  onClose(data) {
      const newData = this.treeRef.current.doChildren(data, {active: false}, true);
      console.log("newda",newData);
      return(
        <Subscribe to={[MemoC]}>
          {(memo) => memo.setState({data: newData})}
        </Subscribe>
      );
  }
  onColor(data) {
      const newData = this.treeRef.current.doChildren(data, {color: 'white'}, true);
      console.log("newda",newData);
      return(
        <Subscribe to={[MemoC]}>
          {(memo) => memo.setState({data: newData})}
        </Subscribe>
      );
  }

//            <Treebeard
//              data={memo.data}
//              onToggle={this.onToggle}
//            />
//  onToggle(node, toggled){
//    if(this.state.cursor){this.state.cursor.active = false;}
//    node.active = true;
//    if(node.children){ node.toggled = toggled; }
//    this.setState({ cursor: node });
//  }

  renderNode(data, level) {
    return(
      <Subscribe to={[MemoC]}>
        {(memo) => (
          <React.Fragment>
            {data.active ?
              <Node>
                <Rotate onClick={() => this.onColor(data)}>▶</Rotate>
                <span style={{color: data.color || 'black'}}>{data.name}</span>
              </Node>
            :null}
          </React.Fragment>
        )}
      </Subscribe>
    );
  }
  renderLastNode(data, level) {
    return(
      <React.Fragment>
      { data.active ?
        <LastNode>
          <span style={{color: data.color || 'black'}}>{data.name}</span>
        </LastNode>
      :null}
      </React.Fragment>
    );
  }
  render(){
    return (
      <Subscribe to={[MemoC]}>
        {(memo) => (
          <div>
            <SimpleTreeView
              ref={this.treeRef}
              style={TreeWrapper}
              data={memo.state.data}
              renderNode={(data,level) => this.renderNode(data, level)}
              renderLastNode={(data, level) => this.renderLastNode(data, level)}
            />
            <InputGroup compact>
              <Select defaultValue="file" style={{width: '40%'}} >
                <Option value="file">ファイル</Option>
                <Option value="dir">フォルダ</Option>
              </Select>
              <Search
                style={{width: '60%'}}
                placeholder="name"
                enterButton="追加"
                onSearch={value => console.log(value)}
              />
            </InputGroup>
        </div>
        )}
      </Subscribe>
    );
  }
}

const TreeWrapper = css`
  height: 400px;
  background-color: red;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(90deg);
  }
`;

const Node = styled.div`
  background-color: yellow;
`;


const Rotate = styled.span`
  display: inline-block;
  animation: ${rotate} 0.3s linear forwards;
  font-size: 1.2rem;
`;

const LastNode = styled.li`
  background-color: red;
`;

