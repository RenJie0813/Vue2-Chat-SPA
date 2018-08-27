import axios from "axios";
import qs from "qs";
import { Loading } from "vue-ydui/dist/lib.rem/dialog";
import router from "@/router/index";

const Axios = axios.create({
  baseURL: "/", // 因为我本地做了反向代理
  timeout: 10000,
  responseType: "json",
  withCredentials: true, // 跨域是否允许带cookie这些
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});

let timer=null;

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    timer=setTimeout(function(){
      Loading.open("拼命加载中");
    },200);

    if (config.method === "post") {
      // 序列化
      config.data = qs.stringify(config.data);
    }

    // 若是有做鉴权token , 就给头部带上token
    // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 sessionStorage 的使用
    // 这里sessionStorage一般是请求成功后我们自行写入到本地的,因为你放在vuex刷新就没了
    // 一些必要的数据写入本地,优先从本地读取
    if (!!sessionStorage.token) {
      config.headers.Authorization = sessionStorage.token;
    }
    return config;
  },
  error => {
    // error 的回调信息,看项目的定义
    console.log("请求失败");
    return Promise.reject(error);
  }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    clearTimeout(timer);
    Loading.close();
    //对响应数据做些事,根据定义的响应格式和状态码做处理
    let resStatus=res.data.status;
    switch(resStatus){
      case 0:
        console.log('suc');
        break;
      case 1:
        console.log('fail');
        break;
      case -1:
        console.log('err');
        break;
    }
    return res.data;
  },
  error => {
    clearTimeout(timer);
    Loading.close();
    //常见错误操作
    // let errCode=error.response.status;
    // switch(errCode){
    //     case 403:
    //       router.push({
    //         path: "/error/403"
    //       });
    //       break;
    //     case 404:
    //       router.push({
    //         path: "/error/404"
    //       });
    //       break;
    //     case 500:
    //       router.push({
    //         path: "/error/500"
    //       });
    //       break;
    //     case 502:
    //       router.push({
    //         path: "/error/502"
    //       });
    //       break;
    //     default:
    //       router.push({
    //         path: "/error/err"
    //       });
    // }
    // 返回 response 里的错误
    return Promise.reject(error.response);
  }
);

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, "$http", { value: Axios });
  }
};