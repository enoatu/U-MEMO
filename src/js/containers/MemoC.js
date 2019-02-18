import { Container } from 'unstated';

export default class MemoC extends Container {
  state = {
   data: [
    {
      id : 'sfsgasfq1111113&',
      name: 'parent1',
      toggle: true,
      active: true,
      type : 'dir',
      children: [
        {
          id : 'sfsgsssssssxjsfq1111113&',
          name: 'child1',
          active: true,
          type : 'file',
          content : 'ssss',
        },
        {
          id : 'sfsgasfq111&',
          name: 'child2',
          active: true,
          type : 'file',
          content : '',
        },
      ]
    },
    {
      id : '1111113&',
      name: 'parent2',
      active: true,
      type : 'dir',
      toggle: true,
      children: [
        {
          id : '11fsfi1113&',
          name: 'nested parent',
          active: true,
          type : 'dir',
          toggle: true,
          children: [
            {
              id : 'sfq1111113&',
              name: 'child3',
              active: true,
              type : 'file',
              content : 'ssssss',
            },
            {
              id : 'sfsgassfsssfsgsgq111&',
              name: 'child5',
              active: true,
              type : 'dir',
              toggle: true,
              children: [],
            },
          ]
        }
      ]
    }
  ]
  };
  node = [
    
  ];

  onCreate(dirId, name, type) {
    const uuid = getUniqueStr();
    let dir = onFindDataById(dirId, data);
    if (!dir) return console.warn('not-found: '+ dirId);
    if (!dir.children) return console.warn(dirId + ' is not directory');
    if (type == 'dir') {
      dir.children.push = ({
        id : uuid,
        name: name,
        toggled: true,
        type : 'dir',
        children: [],
      });
    } else {
      dir.children.push = ({
        id : uuid,
        name: name,
        type : 'file',
        content : '',
      });
    }
  }

  onFindDataById(id, data) {
    for (let d of data) {
      if (d.id == dirId) {
        return d;
      }
    }
    if(d.children) return onFind(id, d.children);
  }

  getUniqueStr() {
    return new Date().getTime().toString(16);
  }

  saveData() {
    const data = JSON.stringify(this.state.todo);
    (async () => {
      try {
        await storage.setItem('@Data:key', data);
      } catch (error) {
        console.log("保存に失敗しました" + error);
      }
    })();
  }
}
