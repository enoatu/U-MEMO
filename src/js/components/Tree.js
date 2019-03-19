'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { Subscribe } from 'unstated';
import MemoC from '../containers/MemoC';
import DrawerC from '../containers/DrawerC';

import { Input, Select } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;

import styled, { css, keyframes } from 'styled-components';
import SimpleTreeView from './TreeView';

class Tree extends React.Component {
  constructor(props){
    super(props);
    this.drawer = this.props.drawer;
    this.memo   = this.props.memo;
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.treeRef = React.createRef();
  }
  componentDidMount() {
  }

  onRadioChange(e) {
    this.memo.setState({
      formSelectType: e.target.type,
    });
  }

  onOpen(data) {
    console.warn('open');
      const newData = this.treeRef.current.doUnderOne(
        data,
        {toggle: true, active: true}, //selfState
        {active: true}, //filestate
        {toggle: false, active: true}, //dirstate
      );
      this.memo.setState({data: newData});
  }

  onClose(data) {
    console.warn('close');
    const newData = this.treeRef.current.doUnderTree(
      data,
      {toggle: false, active: true}, //selfState
      {active: false}, //filestate
      {toggle: false, active: false}, //dirstate
    );
    this.memo.setState({data: newData})
  }

  onSelect(data) {
    //ひとつだけ
    const newData = this.treeRef.current.doOne(
      data,
      {select: true}, //selfState
      {select: false} //othersState
    );
    this.setState({selectedId: data.id});
    console.log("color",newData, data.id);
    this.memo.setState({data: newData});
  }

  onCreate(name) {
    if (!name) return console.warn('non name');
    console.warn(
      this.state.selectedId,
      name,
      this.state.formSelectType);
    const newData = this.treeRef.current.doCreate(
      this.state.selectedId,
      name,
      this.state.formSelectType
    );
    this.memo.setState({data: newData});
  }

  renderNode(data, level) {
    const dir = this.memo.state.dirs[data.id];
    if (!dir) return;
    return (
      <React.Fragment>
        { data.active ?
          <Node key={data.id}>
            {data.toggle?
              <React.Fragment>
                <Space level={level}/>
                <Row>
                <RotateRB onClick={() => this.onClose(data)}>▶</RotateRB>
                  <NodeSpan
                    onClick={() => this.onSelect(data)}
                    select={data.select}
                  >
                    {dir.name}
                  </NodeSpan>
                </Row>
              </React.Fragment>
            :
              <React.Fragment>
                <Space level={level}/>
                <Row>
                  <RotateBR onClick={() => this.onOpen(data)}>▼</RotateBR>
                  <span>{dir.name}</span>
                </Row>
              </React.Fragment>
            }
            </Node>
        :null}
      </React.Fragment>
    );
  }
  renderLastNode(data, level) {
    const file = this.memo.state.files[data.id];
    if (!file) return;
    return(
      <React.Fragment>
        { data.active ?
          <LastNode key={data.id}>
            <Space level={level}/>
            <Row>
              <FileIcon onClick={null}>■</FileIcon>
                <NodeSpan
                  onClick={() => this.onSelect(data)}
                  select={data.select}
                >
                  {file.name}
                </NodeSpan>
            </Row>
          </LastNode>
        :null}
      </React.Fragment>
    );
  }
  render(){
    return (
      <div>
        <SimpleTreeView
          ref={this.treeRef}
          style={TreeWrapper}
          data={this.memo.state.data}
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
            onSearch={value => this.onCreate(value)}
          />
        </InputGroup>
    </div>
    );
  }
}

const TreeWrapper = css`
  background-color: grey;
`;

const rotateRB = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(90deg);
  }
`;
const rotateBR = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-90deg);
  }
`;
const Row = styled.div`
  display: inline-block;
  background-color: rgba(0,0,0,0.1);
`;

const NodeSpan = styled.span`
  background-color: ${props => props.select ? 'pink' : 'white'};
`;

const Node = styled.div`
 // background-color: rgba(112,131,98,0.1);
`;
const FileIcon = styled.span`
  margin: 3px;
 // background-color: rgba(112,131,98,0.1);
`;

const Space = styled.span`
  margin: ${props => props.level * 10}px;
`;
const RotateRB = styled.span`
  display: inline-block;
  animation: ${rotateRB} 0.3s linear forwards;
  font-size: 1.2rem;
`;

const RotateBR = styled.span`
  display: inline-block;
  animation: ${rotateBR} 0.3s linear forwards;
  font-size: 1.2rem;
`;

const LastNode = styled.div`
 // background-color: red;
`;

const Export = () => (
  <Subscribe to={[DrawerC, MemoC]}>
    {(drawer, memo) => <Tree drawer={drawer} memo={memo}/>}
  </Subscribe>
);
export default Export;
