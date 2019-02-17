import { Container } from 'unstated';

export default class DrawerC extends Container {
  state = {
    open: false,
    //page: 'HOME',
    page: 'HOME',
    tree: {
      "module": "react-ui-tree",
      "children": [{
        "collapsed": true,
        "module": "dist",
        "children": [{
          "module": "node.js"
        }]
      }]
    }
  };
  //init = () => {
  //  setTimeout(
  //  () => {
  //    this.setState({
  //      open: false,
  //    });
  //  }, 2000);
  //}
  onClose = () => {
    this.setState({
      open: false,
    });
  }
  onSwitch = () => {
      console.log("onSwitch");
    this.setState({
      open: !this.state.open,
    });
  }
  onSelectPage = (item) => {
    this.setState({
      open: false,
      page: item.key,
    });
  }
}
