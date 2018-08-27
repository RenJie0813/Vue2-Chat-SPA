const mutations={
  // 设置用户信息
  setUserInfo(state,userInfo){
      state.sex=userInfo.sex;
      !!userInfo.headImg&&(state.headImg=userInfo.headImg);
      state.nickName=userInfo.nickName;
      !!userInfo.mobile&&(state.mobile=userInfo.mobile);
  },
  // 设置头像
  setHeadImg(state,img){
    state.headImg=img;
  },
  // 我的好友
  setConcats(state,concat){
      state.myConcats=concat;
  },
  // 添加好友
  addConcat(state,concat){
      state.myConcats.push(concat);
  },
  // 删除好友
  deleteConcat: function (state, mobile) {
    for(let i=0,length=state.myConcats.length;i<length;i++){
      if(state.myConcats[i]['mobile']==mobile){
        state.myConcats.split(i,1);
        return;
      }else{}
    }
  },
  // 设置好友备注
  setConcatRemark(state,mobileAndRemark){
    for(let i=0,length=state.myConcats.length;i<length;i++){
      if(state.myConcats[i]['mobile']==mobileAndRemark['mobile']){
        state.myConcats[i]['remark']=mobileAndRemark['remark'];
        //修改备注之后用户重新分组
        state.myConcats[i]['initial']=window.getFirstLetter(mobileAndRemark['remark']);
        return;
      }else{}
    }
  },
  // 重置未读消息数
  resetUnReadNum(state,num){
    state.unReadNum=num;
  },
  // 重置新的好友请求
  resetNewFrdReq(state,num){
    state.newFriends=num;
  },
  // 设置未读消息数
  addUnReadNum(state,num){
    state.unReadNum+=num;
  },
  // 设置新的好友请求
  addNewFrdReq(state,num){
    state.newFriends+=num;
  },
  // 设置聊天列表
  setChatList(state,list){
    state.chatList=list;
  },
  // 添加聊天
  addChatItem(state,item){
    state.chatList.push(item);
  },
}

export default mutations;
