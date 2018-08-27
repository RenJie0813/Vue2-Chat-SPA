const getters={
  //页面标题
  getPageName:state=>{
    return state.pageName;
  },
  //是否在主页面
  getIsMain:state=>{
    return state.isMain;
  },
  getIsLoading:state=>{
    return state.isLoading;
  },
  getIsLogin:state=>{
    return state.isLogin;
  },
  getHeaderStatus:state=>{
    return state.headerStatus;
  }
}

export default getters;
