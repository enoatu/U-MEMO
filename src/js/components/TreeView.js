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
    return (<li style={{marginLeft: level * 5}}>{level}{data.name}</li>);
  }
  renderLastNode(data, level) {
    if (this.props.renderLastNode) return this.props.renderLastNode(data, level);
    return (<li style={{marginLeft: level * 5}}>{level}{data.name}</li>);
  }

  doAll(tData, state = null, isLastNode = true) {
    let newData = this.doChildrenLoop(tData, state, isLastNode);
      this.setState({data: newData});
  }

  doAllLoop(state, isLastNode, allData = this.state.data) {
    let currentTree = [];
    for (let data of allData) {
      if (data.children && data.children.length) {
        Object.assign(data, state);
        data.children.push(this.doAllLoop(state, isLastNode, data.children));
        currentTree.push(data);
      } else {
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
      if (data.children && data.children.length) {
        if ((data.id != tData.id && own) && found) Object.assign(data, state);
        data.children.push(this.doChildrenLoop(tData, state, own, isLastNode, found, data.children));
        currentTree.push(data);
        found = false;
      } else {
        if (isLastNode) {
          if(found) Object.assign(data, state);
        }
        currentTree.push(data);
      }
    }
    return currentTree;
 }

  render() {
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
