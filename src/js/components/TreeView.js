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
    //  console.log(data);
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

  doChildren(tData, state = null, isLastNode = true) {
 //   if (!state) return allData;
 //   if (!tData.children || !tData.children.length) return allData;

 //   for(let data of allData) {
 //     let dataArr = data.children;
 //     if (tData.id == data.id) return this.doChildrenLoop(allData, tData, state, isLastNode);
 //   }
 //   return allData;//notfound
 // }
 // doChildrenLoop(allData, tData, state, isLastNode) {
 //   let newAllData = [];
 //   for (let data of allData) {
 //     let found = false;
 //     if (tData.id == data.id) found = true;
 //     if (found) {
 //       
 //       
 //     } else {
 //       data.push(
 //     }
 //     if (tData.id == data.id) return this.doChildrenLoop(allData, tData, state, isLastNode, found);
 //     for (let key in state) {
 //       data.key = state[key];
 //     }
 //    if (data.children && data.children.length)
 //     return this.doChildrenLoop(allData, tData, state, isLastNode);
 //   }
 //}

  let newData = this.doChildrenLoop(tData, state, isLastNode);
    this.setState({data: newData});
    console.log('last',newData);
  }

  doChildrenLoop(tData, state, isLastNode, found = false, allData = this.state.data) {
    //console.log('all',allData);
    let currentTree = [];
    for (let data of allData) {
      if (data.children && data.children.length) {
        Object.assign(data, state);
        data.children.push(this.doChildrenLoop(tData, state, isLastNode, found, data.children));
        currentTree.push(data);
      } else {
        if (isLastNode) {
          Object.assign(data, state);
        }
        currentTree.push(data);
        //console.log('end',data);
        //console.log(tData, state, isLastNode, found, data.children);
      }
    }
    console.log('cur',currentTree);
    return currentTree;
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
