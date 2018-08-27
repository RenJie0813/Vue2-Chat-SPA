import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index=resolve => require(['../pages/Index.vue'], resolve);
const Concat=resolve => require(['../pages/Concat.vue'], resolve);
const Setting=resolve => require(['../pages/Setting.vue'], resolve);
const UserDetail=resolve => require(['../pages/UserDetail.vue'], resolve);
const AddFriend=resolve => require(['../pages/AddFriend.vue'], resolve);
const NewFriends=resolve => require(['../pages/NewFriends.vue'], resolve);
const Chat=resolve => require(['../pages/Chat.vue'], resolve);

const HeadImg=resolve => require(['@/components/headImg.vue'], resolve);


export default new Router({
  mode:'history',
  routes: [
    {
      path: '/Index',
      name: '聊天',
      components: {
        default:Index
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Index/Chat',
      components: {
        default:Index,
        content:Chat
      }
    },
    {
      path: '/Concat',
      name: '通讯录',
      components: {
        default:Concat
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Concat/UserDetail',
      name: '详细信息',
      components: {
        default:Concat,
        content:UserDetail,
      }
    },
    {
      path: '/Concat/UserDetail/Chat',
      components: {
        default:Concat,
        content:Chat,
        // slide:Chat
      }
    },
    {
      path: '/Concat/AddFriend',
      name: '添加朋友',
      components: {
        default:Concat,
        content:AddFriend
      }
    },
    {
      path: '/Concat/NewFriends',
      name: '新的朋友',
      components: {
        default:Concat,
        content:NewFriends
      }
    },
    {
      path: '/Concat/NewFriends/AddFriend',
      components: {
        default:Concat,
        content:AddFriend
      }
    },
    {
      path: '/Setting',
      name: '个人设置',
      components: {
        default:Setting,
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Setting/HeadImg',
      components: {
        content:HeadImg,
        default:Setting        
      }
    }
  ],
})
