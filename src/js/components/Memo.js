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
    //デフォルトディレクトリ追加
    if (!this.memo.state.data.length) {
      this.memo.initData();
    }
    if (!this.memo.state.title) {
      const today = new Date();
      const year  = today.getFullYear();
      const month = today.getMonth() + 1;
      const day   = today.getDate();
      const displayDate = `${year}/${month}/${day}`;
      this.memo.setState({title: displayDate});
    }
  }
  
  handleInput(key, value) {
    this.memo.setState({[key]: value});
    this.memo.save();
  }

  render() {
    const { getFieldProps } = this.props.form;
    const date = new Date();
    return (
      <div>
        <List>
          <TextareaItem
            value={this.memo.state.title}
            autoHeight
            onChange={v => this.handleInput('title', v)}
          />
         <TextareaItem
            placeholder="Thank you !"
            rows={30}
            onChange={v => this.handleInput('text', v)}
          />
        </List>
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
