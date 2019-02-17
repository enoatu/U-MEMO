'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { Subscribe } from 'unstated';
import MemoC from '../containers/MemoC';

import { Input, Select } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;

import styled, { css } from 'styled-components';
import SimpleTreeView from './TreeView';

export default class Tree extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type: null,
      input: null,
    };
    this.onRadioChange = this.onRadioChange.bind(this);
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

  render(){
    return (
      <Subscribe to={[MemoC]}>
        {(memo) => (
          <div>
          <ul>
            <SimpleTreeView
              style={TreeWrapper}
              data={memo.data}
            />
          </ul>
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

