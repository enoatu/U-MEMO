import { Container } from 'unstated';
const storage = window.localStorage;
let saveCount = 0;
export default class MemoC extends Container {
  state = {
    title: '',
    text: '',
    charCount: 0,
    color: '#e3acae',
    formSelectType: null,
    formInputText: null,
    treeSelectId: null,
    saveCount: 0,
    content: '',
    selectedId: null,
    data: [
     {
       id : 'sfsgasfq1111113&',
       name: 'parent1',
       toggle: true,
       active: true,
       select: false,
       type : 'dir',
       children: [
         {
           id : 'sfsgsssssssxjsfq1111113&',
           name: 'child1',
           active: true,
           select: false,
           type : 'file',
           content : 'ssss',
         },
         {
           id : 'sfsgasfq111&',
           name: 'child2',
           active: true,
           select: false,
           type : 'file',
           content : '',
         },
       ]
     },
     {
       id : '1111113&',
       name: 'parent2',
       active: true,
       select: false,
       type : 'dir',
       toggle: true,
       children: [
         {
           id : '11fsfi1113&',
           name: 'nested parent',
           active: true,
           select: false,
           type : 'dir',
           toggle: true,
           children: [
             {
               id : 'sfq1111113&',
               name: 'child3',
               active: true,
               select: false,
               type : 'file',
               content : 'ssssss',
             },
             {
               id : 'sfsgassfsssfsgsgq111&',
               name: 'child5',
               active: true,
               select: false,
               type : 'dir',
               toggle: true,
               children: [],
             },
           ]
         }
       ]
     }
    ],
  };

  initData() {
    console.log('init');
    (async () => {
      const result =  await storage.getItem('@Data:key');
      if (!result || !result.length) {
        const id = this.getUniqueStr();
        this.setState({
          data: [
            {
              id: id,
              type: 'dir',
              content: 'text',
              title: 'default',
              children: [],
            }
          ],
        });
        this.setState({treeSelectId: id});
      } else {
        console.log('success', result);
        const data = JSON.parse(result);
        this.setState({data: data});
      }
    })();
  }

  save() {
    saveCount++;
    if (saveCount > 4) {
      saveCount = 0;
      this.doOne(this.state.treeSelectId,
       {title: this.state.title, content: this.state.content})
    }
  }
  // ひとつのnodeに適用
  doOne(tId, state = null) {
    if (!tId || !state) return null;
    let newData = this.doOneLoop(tId, state);
    this.setState({data: newData});
  }

  doOneLoop(tId, state, allData = this.state.data) {
    let currentTree = [];
    for (let data of allData) {
      if (data.children) {
        if (tId == data.id) Object.assign(data, state);
        data.children = this.doOneLoop(tId, state, data.children);
        currentTree.push(data);
      } else if (data.children) {
        //empty dir
        if (tId == data.id) Object.assign(data, state);
      } else {
        //lastnode
        if (tId == data.id) Object.assign(data, state);
        currentTree.push(data);
      }
    }
    return currentTree;
 }
  saveData() {
    (async () => {
      try {
        await storage.setItem('@Data:key', this.state.data);
      } catch (error) {
        console.log("保存に失敗しました" + error);
      }
    })();
  }
}
