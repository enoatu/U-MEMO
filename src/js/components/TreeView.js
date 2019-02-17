import React from 'react';

export default class SimpleTreeView extends React.Component {
  constructor(props) {
    super(props);
  }

  createTree(dataArr = this.props.data, level = 0) {
    if (!dataArr) return null;
    let treeView = [];
        level++;
    for (let data of dataArr) {
      console.log(data);
      if (data.children && data.children.length) {
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

  render() {
    return this.createTree();
  }
}

//  onCreate(dirId, name, type) {
//    const uuid = getUniqueStr();
//    let dir = onFindDataById(dirId, data);
//    if (!dir) return console.warn('not-found: '+ dirId);
//    if (!dir.children) return console.warn(dirId + ' is not directory');
//    if (type == 'dir') {
//      dir.children.push = ({
//        id : uuid,
//        name: name,
//        toggled: true,
//        type : 'dir',
//        children: [],
//      });
//    } else {
//      dir.children.push = ({
//        id : uuid,
//        name: name,
//        toggled: true,
//        type : 'file',
//        content : '',
//      });
//    }
//  }
//
//  onFindDataById(id, data) {
//    for (let d of data) {
//      if (d.id == dirId) {
//        return d;
//      }
//    }
//    if(d.children) return onFind(id, d.children);
//  }
