这是一个模板app，尽可能地吸取了从前app开发工作中的经验。今后的app开发工作都将遵循此章程。
==========================================================================
《components》组件收集，现在开始收集精心编写的通用组件，可以使以后瑞太智联的手机端组件全都长成一个样子。
《core》核心功能总结，工程通用组件。
==========================================================================
如何初始化一个基本的app模板
效果：
1.有模态的信息提示、确认
2.原生短提示（显示时间可控）
3.package.json - navigation 部署
4.redux部署
5.core/components部署
6.logo页、登录页、桌面图标（需要额外资源）

实施步骤：
1.安装 react-navigation 依赖并添加 npm run go/npm run build
2.复制 App.js，Navigation.js，关闭黄色警告框
3.复制 core/components/redux/api 添加 config.js
4.改动 AndroidManifest.xml 布局 adjustPan、权限、网络通讯，改动java添加进原生包引进
5.复制 logo 页 login 页
5*安装

---
6.添加 h5 开发环境 (cra)、替换 index.html(含移动端设定)、复制 components/common
7.复制index.js/index.css、安装 node-sass 等 scss 环境、安装 antd 相关组件群（包括 antd、antd-mobile、@ant-design/icons）
8.package.json 添加 homepage:"."








 
