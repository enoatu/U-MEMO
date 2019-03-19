import { Container } from 'unstated';

export default class DrawerC extends Container {
  state = {
    open: false,
    page: 'HOME',
    selectedId: null,
  };
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
