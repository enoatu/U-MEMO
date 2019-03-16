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
      type: 'file',
      selectedId: null,
    };
    this.onRadioChange = this.onRadioChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.treeRef = React.createRef();
  }
  componentDidMount() {
  }

  onRadioChange(e) {
    this.setState({
      type: e.target.type,
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
      return(
        <Subscribe to={[MemoC]}>
          {(memo) => memo.setState({data: newData})}
        </Subscribe>
      );
  }

  onClose(data) {
    console.warn('close');
    const newData = this.treeRef.current.doUnderTree(
      data,
      {toggle: false, active: true}, //selfState
      {active: false}, //filestate
      {toggle: false, active: false}, //dirstate
    );
    return(
      <Subscribe to={[MemoC]}>
        {(memo) => memo.setState({data: newData})}
      </Subscribe>
    );
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
    return(
      <Subscribe to={[MemoC]}>
        {(memo) => memo.setState({
          data: newData
        })}
      </Subscribe>
    );
  }

  onCreate(name) {
    if (!name) return console.warn('non name');
    console.warn(
      this.state.selectedId,
      name,
      this.state.type);
    const newData = this.treeRef.current.doCreate(
      this.state.selectedId,
      name,
      this.state.type
    );
    return(
      <Subscribe to={[MemoC]}>
        {(memo) =>
          memo.setState({data: newData})
        }
      </Subscribe>
    );
  }

  renderNode(data, level) {
    return(
      <Subscribe to={[MemoC]}>
        {(memo) => (
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
                        {data.name}
                      </NodeSpan>
                    </Row>
                  </React.Fragment>
                :
                  <React.Fragment>
                    <Space level={level}/>
                    <Row>
                      <RotateBR onClick={() => this.onOpen(data)}>▼</RotateBR>
                      <span>{data.name}</span>
                    </Row>
                  </React.Fragment>
                }
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
          <LastNode key={data.id}>
            <Space level={level}/>
            <Row>
              <FileIcon onClick={null}>■</FileIcon>
                <NodeSpan
                  onClick={() => this.onSelect(data)}
                  select={data.select}
                >
                  {data.name}
                </NodeSpan>
            </Row>
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
                onSearch={value => this.onCreate(value)}
              />
            </InputGroup>
        </div>
        )}
      </Subscribe>
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

