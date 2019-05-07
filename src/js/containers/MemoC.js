import { Container } from 'unstated';
const storage = window.localStorage;
let saveCount = 0;
export default class MemoC extends Container {
  state = {
    title: '',
    text: '',
    charCount: 0,
    color: '#e3acae',
    selectedId: null,
    formInputText: null,
    saveCount: 0,
    content: '',
    selectedId: null,
    dirs: {
      'sfsgasfq1111113&': {
        name: 'parent1',
      },
      '1111113&': {
        name: 'parent2',
      },
      '11fsfi1113&': {
        name: 'nested parent',
      },
    },
    files: {
      'sfsgsssssssxjsfq1111113&': {
        name: 'child1',
        content: 'conte',
      },
      'sfsgasfq111&': {
        name: 'child2',
        content: 'conte',
      },
      'sfq1111113&': {
        name: 'child3',
        content: 'conte',
      },
      'sfsgassfsssfsgsgq111&': {
        name: 'child5',
        content: 'conte',
      }
    },
    data: [
     {
       id : 'sfsgasfq1111113&',
       toggle: true,
       active: true,
       select: false,
       type : 'dir',
       children: [
         {
           id : 'sfsgsssssssxjsfq1111113&',
           active: true,
           select: false,
           type : 'file',
         },
         {
           id: 'sfsgasfq111&',
           active: true,
           select: false,
           type : 'file',
         },
       ]
     },
     {
       id : '1111113&',
       active: true,
       select: false,
       type : 'dir',
       toggle: true,
       children: [
         {
           id : '11fsfi1113&',
           active: true,
           select: false,
           type : 'dir',
           toggle: true,
           children: [
             {
               id : 'sfq1111113&',
               active: true,
               select: false,
               type : 'file',
             },
             {
               id : 'sfsgassfsssfsgsgq111&',
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

  saveFiles() {
    (async () => {
      try {
        await storage.setItem('@Files:key', this.state.files);
      } catch (error) {
        console.log("保存に失敗しました" + error);
      }
    })();
  }
  saveDirs() {
    (async () => {
      try {
        await storage.setItem('@Dirs:key', this.state.dirs);
      } catch (error) {
        console.log("保存に失敗しました" + error);
      }
    })();
  }
  saveTree() {
    (async () => {
      try {
        await storage.setItem('@Data:key', this.state.data);
      } catch (error) {
        console.log("保存に失敗しました" + error);
      }
    })();
  }
}
