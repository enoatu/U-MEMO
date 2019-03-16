import React from 'react';
import { Subscribe } from 'unstated';
import MemoC from '../containers/MemoC';
import DrawerC from '../containers/DrawerC';
import { List, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';

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
  }
  
  handleInput(key, value) {
    this.memo.setState({[key]: value});
    this.memo.save();
  }

    //<p>{date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}</p>
  render() {
    const { getFieldProps } = this.props.form;
    const date = new Date();
    return (
    <div>
    <List>
      <TextareaItem
        placeholder="title"
        autoHeight
        onChange={v => this.handleInput('title', v)}
      />
      <TextareaItem
        {...getFieldProps('count', {
        })}
        placeholder="Thank you !"
        rows={10}
        count={100}
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
