(this.webpackJsonpapph5=this.webpackJsonpapph5||[]).push([[0],{153:function(e,t,n){},154:function(e,t,n){},155:function(e,t,n){},156:function(e,t,n){},236:function(e,t,n){},259:function(e,t,n){"use strict";n.r(t);var a=n(11),c=n(0),o=n.n(c),r=n(9),i=n.n(r),s=(n(153),n(68)),d=n(30),u=n(31),l=n(35),f=n(34),h=(n(154),n(44)),p={traceBack:function(e,t){window.ReactNativeWebView&&window.ReactNativeWebView.postMessage&&("string"===typeof t?window.ReactNativeWebView.postMessage(JSON.stringify({etype:e,info:t})):t?window.ReactNativeWebView.postMessage(JSON.stringify(Object(s.a)({etype:e},t))):window.ReactNativeWebView.postMessage(JSON.stringify({etype:e})))},dateToString:function(e,t){if(!e)return alert("\u6ca1\u6709\u4e00\u4e2a\u65e5\u671f"),"";var n=e.getFullYear(),a=e.getMonth()+1,c=e.getDate(),o=n+"/"+p.mendUpNumber(a)+"/"+p.mendUpNumber(c);if(t){var r=t.getFullYear(),i=t.getMonth()+1,s=t.getDate();o+=" \u81f3 "+r+"/"+p.mendUpNumber(i)+"/"+p.mendUpNumber(s)}return o},mendUpNumber:function(e){return e<10?"0"+e:e},setItUp:function(e,t){Object(h.a)(t.children).forEach((function(e){e.className=e.className.replace(/\sactive/,"")})),e.className+=" active"},calcColumn:function(e,t){var n=e.map((function(e,n){var a={};return a.title=e,a.dataIndex=t[n],a.key=t[n],a}));return console.log(n),n}},j=p,m=(n(155),function(e){Object(l.a)(n,e);var t=Object(f.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object(a.jsx)("div",{className:"app-container",children:Object(a.jsx)("div",{className:"app-contents",children:this.props.children})})}}]),n}(o.a.Component)),b=(n(156),n(82)),v=(n(226),n(232),0);function g(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,n=[],a=0;a<t;a++)n.push("row - ".concat(e*t+a));return n}var O=function(e){Object(l.a)(n,e);var t=Object(f.a)(n);function n(e){var a;Object(d.a)(this,n),(a=t.call(this,e)).onRefresh=function(){console.log("inner-com-list onRefresh");var e=a.props.onRefresh;"function"===typeof e&&e()},a.onEndReached=function(e){console.log("inner-com-list onEndReached"),a.loading((function(){if(!a.state.isLoading||a.state.hasMore){console.log("onEndReached \u52a0\u8f7d\u4e00\u6b21");var e=a.props.onEndReached;"function"===typeof e&&e(v)}}))},a.refreshing=function(){a.setState({refreshing:!0})},a.loading=function(e){a.setState({isLoading:!0},(function(){"function"===typeof e&&e()}))},a.loaded=function(){a.setState({isLoading:!1,refreshing:!1})},a.nomore=function(){a.setState({hasMore:!1})},a.loadData=function(e){v=0,a.setState({hasMore:!0,data:[],dataSource:a.state.dataSource.cloneWithRows(g(0,0))}),a.rData=g(0,e.length),a.setState({data:e,dataSource:a.state.dataSource.cloneWithRows(a.rData)})},a.setData=function(e){a.rData=[].concat(Object(h.a)(a.rData),Object(h.a)(g(++v,e.length))),a.setState({data:[].concat(Object(h.a)(a.state.data),Object(h.a)(e)),dataSource:a.state.dataSource.cloneWithRows(a.rData)})};var c=new b.a.DataSource({rowHasChanged:function(e,t){return e!==t}});return a.state={data:[],dataSource:c,refreshing:!1,isLoading:!1,hasMore:!0,height:document.documentElement.clientHeight},a}return Object(u.a)(n,[{key:"componentDidMount",value:function(){document.body.style.overflow="hidden";var e=this.state.height-i.a.findDOMNode(this.lv).offsetTop;this.setState({height:e})}},{key:"render",value:function(){var e=this,t=this.state,n=(t.dataSource,t.data),c=t.isLoading,o=t.hasMore,r=this.props,i=r.separator,s=r.renderItem,d=r.onClick,u=n.length-1,l=function(e,t){return t?e&&t?Object(a.jsx)("span",{children:"\u52a0\u8f7d\u66f4\u591a..."}):Object(a.jsx)("span",{}):Object(a.jsx)("span",{children:"\u6ca1\u6709\u66f4\u591a\u6570\u636e\u4e86"})};return Object(a.jsx)("div",{children:Object(a.jsx)(b.a,{ref:function(t){return e.lv=t},dataSource:this.state.dataSource,renderFooter:function(){return Object(a.jsx)("div",{className:"list-view-footer-container",children:l(c,o)})},renderRow:function(e,t,a){return s({data:n,onClick:d,itemIndex:u--,rowData:e,sectionID:t,rowID:a})},renderSeparator:i,useBodyScroll:!1,style:{height:this.state.height},pullToRefresh:Object(a.jsx)(b.b,{refreshing:this.state.refreshing,onRefresh:this.onRefresh,damping:24,distanceToRefresh:24}),onEndReachedThreshold:1,initialListSize:n.length,onEndReached:this.onEndReached})})}}]),n}(o.a.Component),x=(n(236),n(263)),k=(n(260),n(264)),w=n(265),y=n(266),D=n(267),R=n(268),S=function(e){switch(e){case"add":return Object(a.jsx)(k.a,{});case"scan":return Object(a.jsx)(w.a,{});default:return Object(a.jsx)(y.a,{})}},N=function(e){var t=e.addons;if(t instanceof Array&&t.length){var n=t.map((function(e,t){var n=e.fn;return Object(a.jsxs)("li",{onClick:function(){"function"===typeof n&&n()},children:[S(e.name),Object(a.jsx)("span",{children:e.text})]},"ia".concat(t))}));return Object(a.jsx)(x.a,{overlay:Object(a.jsx)("ul",{className:"rtmcc-rnweb-top-title-right-addons",children:n}),placement:"bottomLeft",arrow:!0,children:Object(a.jsx)(D.a,{})})}},L=function(e){Object(l.a)(n,e);var t=Object(f.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.title,c=(t.addons,t.canBack);return Object(a.jsxs)("div",{className:"rtmcc-rnweb-top-title",children:[c?Object(a.jsx)(R.a,{onClick:function(){!function(e){j.traceBack("back-btn");var t=e.onPressBack;"function"===typeof t&&t()}(e.props)}}):null,Object(a.jsx)("p",{children:n}),N(this.props)]})}}]),n}(o.a.Component),E={data:function(){for(var e=[],t=0;t<10;t++)e.unshift({name:"\u6587\u4ef6\u540dtest".concat(t),person:"admin",date:"2020-06-".concat(t+10),remarks:"\u4e00\u4e9b\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u7684\u5907\u6ce8\u5185\u5bb9"});return console.log(e),e},reData:function(){for(var e=[],t=0;t<10;t++)e.unshift({name:"\u6587\u4ef6\u540dttest".concat(t),person:"admin",date:"2020-07-".concat(t+10),remarks:"\u4e00\u4e9b\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u7684\u5907\u6ce8\u5185\u5bb9"});return e},moreData:function(){for(var e=[],t=0;t<3;t++)e.push({name:"\u6587\u4ef6\u540dtest".concat(t+10),person:"admin",date:"2020-08-".concat(t+20),remarks:"\u4e00\u4e9b\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u5f88\u6709\u8da3\u7684\u5907\u6ce8\u5185\u5bb9"});return e}},I=E,M=function(e){var t=e.data,n=e.onClick,c=e.itemIndex,o=(e.rowData,e.sectionID,e.rowID);c<0&&(c=t.length-1);var r=t[c];return r?Object(a.jsxs)("div",{className:"item-outer",onClick:function(){"function"===typeof n&&n(r),j.traceBack("clickItem",r)},children:[Object(a.jsx)("p",{className:"title",children:r.name}),Object(a.jsx)("p",{className:"remarks",children:r.remarks}),Object(a.jsx)("div",{className:"spliter"}),Object(a.jsxs)("p",{className:"detail",children:[Object(a.jsxs)("span",{children:["\u4e0a\u4f20\u4eba\uff1a",r.person]}),Object(a.jsxs)("span",{children:["\u4e0a\u4f20\u65f6\u95f4\uff1a",r.date]})]})]},o):null},C=function(e){Object(l.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(d.a)(this,n);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).state={title:"",pageLoading:!1,detail:{}},e.onClickItem=function(e){j.traceBack("clickItem")},e.listLoading=function(){e.refs.lv.loading()},e.listLoaded=function(){e.refs.lv.loaded()},e.noMoreItem=function(){e.refs.lv.nomore()},e.loadListData=function(t){e.refs.lv.loadData(t)},e.setListData=function(t){e.refs.lv.setData(t)},e.onRefreshList=function(t){e.refs.lv.refreshing(),setTimeout((function(){e.loadListData(I.reData()),e.listLoaded()}),1500),j.traceBack("onRefreshList")},e.onEndReached=function(t){setTimeout((function(){e.setListData(I.moreData())}),1500),j.traceBack("onEndReached",{ps:t})},e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this;j.traceBack("pageState","componentDidMount"),document.addEventListener("message",(function(t){var n=JSON.parse(t.data);if("data"===n.etype){var a=Object(s.a)({},n);delete a.etype,e.setState(Object(s.a)({},a))}else if("event"===n.etype){var c=n.event,o=n.args;"function"===typeof e[c]&&e[c](o)}})),this.loadListData(I.data())}},{key:"render",value:function(){return Object(a.jsxs)(m,{children:[Object(a.jsx)(L,{title:"\u4e00\u822c\u5217\u8868\u9875",canBack:!0}),Object(a.jsx)("div",{style:{width:"100%",height:"10px"}}),Object(a.jsx)(O,{ref:"lv",height:document.documentElement.clientHeight,onClick:this.onClickItem,renderItem:M,onRefresh:this.onRefreshList,onEndReached:this.onEndReached,separator:null})]})}}]),n}(o.a.Component);i.a.render(Object(a.jsx)(C,{}),document.getElementById("root"))}},[[259,1,2]]]);
//# sourceMappingURL=main.93ba86e8.chunk.js.map