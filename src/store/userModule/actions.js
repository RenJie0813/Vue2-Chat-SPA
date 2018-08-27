const actions={
    // 设置聊天列表
  setChatList({ commit },list){
    let total=0;
    list.map(function(item){
        total+=item['newMsgCount']
    });
    commit("setChatList",list);
    commit("resetUnReadNum",total);
  },
  // 添加聊天
  addChatItem({ commit },item){
    let num=item['newMsgCount'];
    num>0&&(commit("addUnReadNum",num));
    commit("addChatItem",item);
  },
  // 删除聊天
  delChatItem({ state, commit },chatId){
    for(let i=0,length=state.chatList.length;i<length;i++){
        if(state.chatList[i]['chatId']==chatId){
            let del=state.chatList.splice(i,1);           
            commit("addUnReadNum",-del[0]['newMsgCount']);
            break;
        }
    }
  },
  // 清空聊天
  empChatList({ commit }){
    commit("resetUnReadNum",0);
    commit("setChatList",[]);    
  }
}

export default actions;