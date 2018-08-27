const mutations={
  //设置页面标题
  setPageName(state,name){
    state.pageName=name;
  },
  //设置当前主页面
  setMain(state,is){
    state.isMain=is;
  },
  updateLoadingStatus(state, isLoading) {
    state.isLoading = isLoading;
  },
  setLogin(state){
    state.isLogin=!state.isLogin;
  },
  //当 search 组件全屏/非全屏时 切换公共头部状态
  toggleHeaderStatus(state, status) {
    state.headerStatus = status;
  },
  setDevice(state,status){
    if(status.isPC==true){
      state.isPC=true;
      state.isAndroid=false;
    }else{
      if(status.isAndroid==true){
        state.isAndroid=true;        
      }else{
        state.isAndroid=false;
      }
      state.isPC=false;      
    }
  }
}

export default mutations;
