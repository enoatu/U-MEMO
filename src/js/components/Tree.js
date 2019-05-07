import React from 'react';
import ReactDOM from 'react-dom';

import { Subscribe } from 'unstated';
import MemoC from '../containers/MemoC';
import DrawerC from '../containers/DrawerC';

import { Input, Select, Icon, Button } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;

import styled, { createGlobalStyle } from 'styled-components';
import SimpleTreeView from './TreeView';

class Tree extends React.Component {
  constructor(props){
    super(props);
    this.drawer = this.props.drawer;
    this.memo   = this.props.memo;
    this.onRemoveSelect = this.onRemoveSelect.bind(this);
    this.onSelectFile = this.onSelectFile.bind(this);
    this.onSelectDir = this.onSelectDir.bind(this);
    this.onCreateDir = this.onCreateDir.bind(this);
    this.onCreateFile = this.onCreateFile.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.treeRef = React.createRef();
  }

  componentDidMount() {
    document.querySelector(".ant-drawer-content").addEventListener('click', ()  => this.onRemoveSelect());
  }
  componentWillUnmount() {
    document.querySelector(".ant-drawer-content").removeEventListener('click', () => this.onRemoveSelect());
  }

  onOpen(e, data) {
    console.warn('open');
    e.stopPropagation()
    const newData = this.treeRef.current.doUnderOne(
      data,
      {toggle: true, active: true}, //selfState
      {active: true}, //filestate
      {toggle: false, active: true}, //dirstate
    );
    this.memo.setState({data: newData});
  }

  onClose(e, data) {
    console.warn('close');
    e.stopPropagation()
    const newData = this.treeRef.current.doUnderTree(
      data,
      {toggle: false, active: true}, //selfState
      {active: false}, //filestate
      {toggle: false, active: false}, //dirstate
    );
    this.memo.setState({data: newData})
  }

  onSelectDir(e, data) {
    e.stopPropagation();
    this.memo.setState({selectedDirId: data.id});
  }
  onSelectFile(e, data) {
    e.stopPropagation();
    if (data.type == 'file') {
      //ファイルクリックされたら反映
      const file = this.memo.state.files[data.id];
      this.memo.setState({selectedFileId: data.id, title: file.name, content: file.content});
      this.drawer.onClose();
      return;
    }
    //const newData = this.treeRef.current.doOne(
    //  data,
    //  {select: true}, //selfState
    //  {select: false} //othersState
    //);
    //this.memo.setState({selectedFileId: data.id, data: newData});
  }

  onRemoveSelect(e) {
    console.warn("removed!");
    this.memo.setState({selectedDirId: null});
  }

  onCreateFile(e, name = 'new file') {
    if (!this.memo.state.selectedFileId) return;
   // console.warn(
   //   this.memo.state.selectedFileId,
   //   name,
   // );
    const result = this.treeRef.current.doCreateFile(
      this.memo.state.selectedFileId,
      name,
    );
    this.memo.setState({data: result.data, files: result.files});
    e.stopPropagation();
  }

  onCreateDir(e, name = 'new folder') {
    e.stopPropagation();
    console.warn("oooooooooooO");
    if (!this.memo.state.selectedFileId) return;
   // console.warn(
   //   this.memo.state.selectedDirId,
   //   name,
   // );
    const result = this.treeRef.current.doCreateDir(
      this.memo.state.selectedDirId,
      name,
    );
    this.memo.setState({data: result.data, dirs: result.dirs});
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
                <DirRow level={level}>
                  <DirIcon onClick={e => this.onClose(e, data)}>
                    <Icon type="folder-open" />
                  </DirIcon>
                  <NodeSpan
                    onClick={e => this.onSelectDir(e, data)}
                    select={this.memo.state.selectedDirId == data.id}
                  >
                    {dir.name}
                  </NodeSpan>
                </DirRow>
              </React.Fragment>
            :
              <React.Fragment>
                <DirRow level={level}>
                  <DirIcon onClick={e => this.onOpen(e, data)}>
                    <Icon type="folder" />
                  </DirIcon>
                  <NodeSpan
                    onClick={e => this.onSelectDir(e, data)}
                    select={this.memo.state.selectedDirId == data.id}
                  >
                    {dir.name}
                  </NodeSpan>
                </DirRow>
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
            <FileRow level={level} themeColor={this.memo.state.color}>
              <FileIcon onClick={null}>
                <Icon type="file-text" />
              </FileIcon>
              <NodeSpan
                onClick={e => this.onSelectFile(e, data)}
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
      <Wrapper>
        <MakeBox>
          <Button>
            <Icon type="delete" />
          </Button>
          <Button
            onClick={e => this.onCreateDir(e)}
            disabled={this.memo.state.selectedDirId == null}
          >
            <Icon type="folder-add" />
          </Button>
          <Button onClick={e => this.onCreateFile(e)}>
            <Icon type="file-add" />
          </Button>
        </MakeBox>
        <SimpleTreeView
          ref={this.treeRef}
          files={this.memo.state.files}
          dirs={this.memo.state.dirs}
          data={this.memo.state.data}
          renderNode={(data,level) => this.renderNode(data, level)}
          renderLastNode={(data, level) => this.renderLastNode(data, level)}
        />
    </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  height: 100%;
`;
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

const DirRow = styled.div`
  margin-left: ${props => props.level * 20}px;
  display: inline-block;
`;

const DirIcon = styled.div`
  display: inline-block;
  background-color: #fff;
  i {
    svg {
      width: 1.5em;
      height: 1.5em;
    }
  }
`;

const FileRow = styled.div`
  margin-left: ${props => props.level * 20}px;
  display: inline-block;
  border-bottom: solid;
  border-color: ${props => props.themeColor};
  border-width: 2px;
`;

const FileIcon = styled.div`
  display: inline-block;
  background-color: #fff;
  i {
    svg {
      width: 1.5em;
      height: 1.5em;
    }
  }
`;

const NodeSpan = styled.span`
  font-size: 20px;
  background-color: ${props => props.select ? 'pink' : 'white'};
`;

const Node = styled.div`
  &:hover {
    background-color: rgba(100,100,100, 0.1);
  }
`;

const LastNode = styled.div`
  &:hover {
    background-color: rgba(100,100,100, 0.1);
  }
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Export = () => (
  <Subscribe to={[DrawerC, MemoC]}>
    {(drawer, memo) => <Tree drawer={drawer} memo={memo}/>}
  </Subscribe>
);
export default Export;
