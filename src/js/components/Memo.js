import React from 'react';
import { Subscribe } from 'unstated';
import MemoC from '../containers/MemoC';
import DrawerC from '../containers/DrawerC';
import { List, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import { Input } from 'antd';

const { TextArea } = Input;
class Memo extends React.Component {
  constructor(props) {
    super(props);
    this.drawer = this.props.drawer;
    this.memo   = this.props.memo;
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    if (!this.memo.state.selectedDirId) {
      this.drawer.onClose();
      return;
    }
    if (!this.memo.state.data.length) {
      //デフォルトディレクトリ追加
      this.memo.initData();
    }
    if (!this.memo.state.title) {
      const today = new Date();
      const year  = today.getFullYear();
      const month = today.getMonth() + 1;
      const day   = today.getDate();
      const displayDate = `${year}/${month}/${day}`;
      //this.memo.setState({title: displayDate});
    }
  }
  
  handleInput(key, value) {
      console.log(key,value);
    this.memo.setState({[key]: value});
    this.memo.saveFile();
  }

  render() {
    const { getFieldProps } = this.props.form;
    const date = new Date();
    return (
      <div>
          <textarea
            value={this.memo.state.title}
            onChange={e => this.handleInput('title', e.target.value)}
          />
          <textarea
            value={this.memo.state.content}
            placeholder="Thank you !"
            rows={30}
            onChange={e => this.handleInput('content', e.target.value)}
          />
      </div>
    );
  }
}
const MemoWrap = createForm()(Memo);
const Export = () => (
  <Subscribe to={[DrawerC, MemoC]}>
    {(drawer, memo) => <MemoWrap drawer={drawer} memo={memo}/>}
  </Subscribe>
);
export default Export;
