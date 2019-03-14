import React from 'react';

export default class SimpleTreeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      newData: [],
    }
  }
  componentDidMount() {
    this.setState({data: this.props.data});
  }

  createTree(dataArr = this.state.data, level = 0) {
    if (!dataArr) return null;
    let treeView = [];
    level++;
    for (let data of dataArr) {
      if (data.children) {
        treeView.push(
          <React.Fragment key={data.id}>
            {this.renderNode(data, level)}
            {this.createTree(data.children, level)}
          </React.Fragment>
        );
      } else {
        treeView.push(
          <React.Fragment key={data.id}>
            {this.renderLastNode(data, level)}
          </React.Fragment>
        );
      }
    }

    return treeView;
  }

  renderNode(data, level) {
    if(this.props.renderNode) return this.props.renderNode(data, level);
    //デフォルト
    return (<li style={{marginLeft: level * 5}}>{level}{data.name}</li>);
  }
  renderLastNode(data, level) {
    if (this.props.renderLastNode) return this.props.renderLastNode(data, level);
    //デフォルト
    return (<li style={{marginLeft: level * 5}}>{level}{data.name}</li>);
  }
  
  // すべてのnodeに適用
  doAll(state = null, isLastNode = true) {
    let newData = this.doChildrenLoop(state, isLastNode);
      this.setState({data: newData});
  }

  doAllLoop(state, isLastNode, allData = this.state.data) {
    let currentTree = [];
    for (let data of allData) {
      if (data.children) {
        Object.assign(data, state);
        data.children = this.doAllLoop(state, isLastNode, data.children);
        currentTree.push(data);
      } else if (data.children) {
        //empty dir
      } else {
        //lastnode
        if (isLastNode) {
          Object.assign(data, state);
        }
        currentTree.push(data);
      }
    }
    return currentTree;
 }

  doChildren(tData, state = null, own = false, isLastNode = true) {
    let newData = this.doChildrenLoop(tData, state, own, isLastNode);
    this.setState({data: newData});
  }

  doChildrenLoop(tData, state, own, isLastNode, found = false, allData = this.state.data) {
    let currentTree = [];
    for (let data of allData) {
      if (data.id == tData.id) found = true;
      if (data.children) {
        if ((data.id != tData.id && own) && found) Object.assign(data, state);
        data.children = this.doChildrenLoop(tData, state, own, isLastNode, found, data.children);
        found = false;
      } else {
        if (isLastNode) {
          if(found) Object.assign(data, state);
        }
      }
      currentTree.push(data);
    }
    return currentTree;
  }

  //クリックしたやつの下位に再帰的に適用
  doUnderTree(tData, selfState = null, fileState = null, dirState = null) {
    if (!fileState && !dirState) return;
    let newData = this.doUnderTreeLoop(tData, selfState, fileState, dirState);
    this.setState({data: newData});
    console.log('file', newData);
  }

  doUnderTreeLoop(tData, selfState, fileState, dirState, found = false, allData = this.state.data) {
    let currentTree = [];
    for (let data of allData) {
      if (data.id == tData.id) found = true;
      const apply = (data.id == tData.id) && selfState;
      if (data.children && data.children.length) {
        //have child
        if (found) Object.assign(data, apply && selfState || dirState);
        data.children = this.doUnderTreeLoop(tData, selfState, fileState, dirState, found, data.children);
        found = false;
      } else if (data.children) {
        //empty dir
        if (found) Object.assign(data, apply && selfState || dirState);
      } else {
        //lastnode
        if (found) Object.assign(data, fileState);
      }
      currentTree.push(data);
    }
    return currentTree;
  }

  //クリックしたやつだけ適用
  doOne(tData, selfState = null, othersState = null) {
    if (!selfState && !othersState) return;
    let newData = this.doOneLoop(tData, selfState, othersState);
    this.setState({data: newData});
    console.log('doOne', newData);
  }

  doOneLoop(tData, selfState, othersState, found = false,  allData = this.state.data) {
    let currentTree = [];
    for (let data of allData) {
      if (data.children && data.children.length) {
        //have child
        if (!found && data.id == tData.id) {
          Object.assign(data, selfState);
          found = true;
        } else {
          if (othersState) Object.assign(data, othersState);
        }
        data.children = this.doOneLoop(tData, selfState, othersState, found, data.children);
      } else if (data.children) {
        //empty dir
        if (!found && data.id == tData.id) {
          Object.assign(data, selfState);
          found = true;
        } else {
          if (othersState) Object.assign(data, othersState);
        }
      } else {
        if (!found && data.id == tData.id) {
          Object.assign(data, selfState);
          found = true;
        } else {
          if (othersState) Object.assign(data, othersState);
        }
      }
      currentTree.push(data);
    }
    return currentTree;
  }

  //クリックしたやつの一段階下だけ適用
  doUnderOne(tData, selfState = null, fileState = null, dirState = null) {
    if (!fileState && !dirState) return;
    let newData = this.doUnderOneLoop(tData, selfState, fileState, dirState);
    this.setState({data: newData});
    console.log('file', newData);
  }

  doUnderOneLoop(tData, selfState, fileState, dirState, found = false, allData = this.state.data) {
    let currentTree = [];
    for (let data of allData) {
      if (data.children && data.children.length) {
        //have child
        if (data.id == tData.id) Object.assign(data, selfState);
        else if (found) Object.assign(data, dirState);
        found = (data.id == tData.id) ? true : false;
        data.children = this.doUnderOneLoop(tData, selfState, fileState, dirState, found, data.children);
        found = false;
      } else if (data.children) {
        //empty dir
        if (data.id == tData.id) Object.assign(data, selfState);
        else if (found) Object.assign(data, dirState);
      } else {
        //lastnode
        if (found) Object.assign(data, fileState);
      }
      currentTree.push(data);
    }
    return currentTree;
  }

  render() {
    console.log('render',this.state.data);
    return this.createTree();
  }

  onCreate(dirId, name, type) {
    const uuid = getUniqueStr();
    let dir = onFindDataById(dirId, data);
    if (!dir) return console.warn('not-found: '+ dirId);
    if (!dir.children) return console.warn(dirId + ' is not directory');
    if (type == 'dir') {
      dir.children.push = ({
        id : uuid,
        name: name,
        toggled: true,
        active: true,
        type : 'dir',
        children: [],
      });
    } else {
      dir.children.push = ({
        id : uuid,
        name: name,
        toggled: true,
        active: true,
        type : 'file',
        content : '',
      });
    }
  }

  onFindDataById(id, data) {
    for (let d of data) {
      if (d.id == dirId) {
        return d;
      }
    }
    if(d.children) return onFindDataById(id, d.children);
  }
}
