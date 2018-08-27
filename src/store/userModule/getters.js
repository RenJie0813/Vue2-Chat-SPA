const getters={
  getUserData:state=>{
    let user={
      nickName:state.nickName,
      headImg:state.headImg,
      mobile:state.mobile,
      sex:state.sex
    }
    return user;
  },
  getUserOneInfo:state=>some=>{
    return state[some];
  },
  getConcats:state=>{
    return state.myConcats;
  },
  getConcatOne:state=>mobile=>{
    for(let i=0,length=state.myConcats.length;i<length;i++){
      if(state.myConcats[i]['mobile']==mobile){
        return state.myConcats[i];
      }else{
      }
    }
    return null
  },
  // 获取聊天列表
  getChatList:state=>{
    return state.chatList
  }
}

export default getters;
