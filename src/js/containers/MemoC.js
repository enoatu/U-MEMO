import { Container } from 'unstated';
const storage = window.localStorage;
export default class MemoC extends Container {
  state = {
    selectedFileId: null,
    selectedDirId: null,
    title: '',
    content: '',
    charCount: 0,
    color: '#e3acae',
    formInputText: null,
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
       type : 'dir',
       children: [
         {
           id : 'sfsgsssssssxjsfq1111113&',
           active: true,
           type : 'file',
         },
         {
           id: 'sfsgasfq111&',
           active: true,
           type : 'file',
         },
       ]
     },
     {
       id : '1111113&',
       active: true,
       type : 'dir',
       toggle: true,
       children: [
         {
           id : '11fsfi1113&',
           active: true,
           type : 'dir',
           toggle: true,
           children: [
             {
               id : 'sfq1111113&',
               active: true,
               type : 'file',
             },
             {
               id : 'sfsgassfsssfsgsgq111&',
               active: true,
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

  saveTree() {
    try {
      storage.setItem('@u-memo:tree', this.state.data);
    } catch (error) {
      console.log("保存に失敗しました", error);
    }
  }

  saveFile(id) {
    const data = {
      title: this.state.title,
      content: this.state.content
    };
    try {
      storage.setItem('@u-memo:memo:' + id, JSON.stringify(data));
    } catch (error) {
      console.log("保存に失敗しました", error);
    }
  }
}
