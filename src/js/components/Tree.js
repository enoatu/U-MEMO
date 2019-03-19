'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { Subscribe } from 'unstated';
import MemoC from '../containers/MemoC';
import DrawerC from '../containers/DrawerC';

import { Input, Select, Icon, Button } from 'antd';
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
    if (data.type == 'file') {
      //ファイルクリックされたら反映
      const file = this.memo.state.files[data.id];
      this.memo.setState({title: file.name, content: file.content});
      this.drawer.onClose();
      return;
    }
      //ディレクトリクリックで選択
    const newData = this.treeRef.current.doOne(
      data,
      {select: true}, //selfState
      {select: false} //othersState
    );
    this.memo.setState({selectedId: data.id, data: newData});
  }

  onCreateFile(name = 'new file') {
    console.warn(
      this.memo.state.selectedId,
      name,
    );
    const result = this.treeRef.current.doCreateFile(
      this.memo.state.selectedId,
      name,
    );
    this.memo.setState({data: result.data, files: result.files});
  }
  onCreateDir(name = 'new folder') {
    console.warn(
      this.memo.state.selectedId,
      name,
    );
    const result = this.treeRef.current.doCreateDir(
      this.memo.state.selectedId,
      name,
    );
    this.memo.setState({data: result.newData, dirs: result.dirs});
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
                <RotateRB onClick={() => this.onClose(data)}><Icon type="folder-open" /></RotateRB>
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
                  <RotateBR onClick={() => this.onOpen(data)}><Icon type="folder" /></RotateBR>
                  <NodeSpan
                    onClick={() => this.onSelect(data)}
                    select={data.select}
                  >
                    {dir.name}
                  </NodeSpan>
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
            <FileRow themeColor={this.memo.state.color}>
              <FileIcon onClick={null}><Icon type="file-text" /></FileIcon>
                <NodeSpan
                  onClick={() => this.onSelect(data)}
                  select={data.select}
                >
                  {file.name}
                </NodeSpan>
            </FileRow>
          </LastNode>
        :null}
      </React.Fragment>
    );
  }
  render(){
    return (
      <div>
        <MakeBox>
          <Button><Icon type="delete" /></Button>
          <Button onClick={() => this.onCreateDir()}><Icon type="folder-add" /></Button>
          <Button onClick={() => this.onCreateFile()}><Icon type="file-add" /></Button>
        </MakeBox>
        <SimpleTreeView
          ref={this.treeRef}
          style={TreeWrapper}
          files={this.memo.state.files}
          dirs={this.memo.state.dirs}
          data={this.memo.state.data}
          renderNode={(data,level) => this.renderNode(data, level)}
          renderLastNode={(data, level) => this.renderLastNode(data, level)}
        />
    </div>
    );
  }
}

       // <InputGroup compact>
       //   <Select defaultValue="file" style={{width: '40%'}} >
       //     <Option value="file">ファイル</Option>
       //     <Option value="dir">フォルダ</Option>
       //   </Select>
       //   <Search
       //     style={{width: '60%'}}
       //     placeholder="name"
       //     enterButton="追加"
       //     onSearch={value => this.onCreate(value)}
       //   />
       // </InputGroup>
const MakeBox = styled.div`
  width:100%;
  margin: 40px 30px 40px 0px;
  display: flex;
  flex-direction: row;
  Button {
    flex: 1;
    background-color: #fff;
    i {
      svg {
        width: 2em;
        height: 2em;
      }
    }
  }
`;

const TreeWrapper = css`
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
`;
const FileRow = styled.div`
  display: inline-block;
  border-bottom: solid;
  border-color: ${props => props.themeColor};
  border-width: 2px;/*5ピクセルの太さにする*/
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
  //animation: ${rotateRB} 0.3s linear forwards;
  font-size: 1.2rem;
`;

const RotateBR = styled.span`
  display: inline-block;
  //animation: ${rotateBR} 0.3s linear forwards;
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
