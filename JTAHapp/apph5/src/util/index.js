const util = {};

//通向RN端
//信息传输
//字符串表示简单信息(生命周期相关)
//对象
// {type:"string",content:"xxxxxxxxxxxxxxxxxxxxxx"}----------回传一个字符串
// {type:"navigation",path:"xxxxxxxxxxx",params:{}}----------带参数跳转到某页面
// {type:"event",params:{}}----------------------------------带参数触发某事件

util.traceBack = (etype, info) => {
  if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
    if (typeof info === "string") {
      window.ReactNativeWebView.postMessage(JSON.stringify({ etype, info }));
    } else if (!info) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ etype }));
    } else {
      window.ReactNativeWebView.postMessage(JSON.stringify({ etype, ...info }));
    }
  }
};

//
util.dateToString = (startDate, endDate) => {
  if (!startDate) {
    alert("没有一个日期");
    return "";
  }

  let sy = startDate.getFullYear();
  let sm = startDate.getMonth() + 1;
  let sd = startDate.getDate();
  let result = sy + "/" + util.mendUpNumber(sm) + "/" + util.mendUpNumber(sd);

  if (endDate) {
    let ey = endDate.getFullYear();
    let em = endDate.getMonth() + 1;
    let ed = endDate.getDate();
    result +=
      " 至 " + ey + "/" + util.mendUpNumber(em) + "/" + util.mendUpNumber(ed);
  }

  return result;
};

//
util.mendUpNumber = num => {
  if (num < 10) {
    return "0" + num;
  }
  return num;
};

//表格操作高亮
util.setItUp = (tr, tbody) => {
  //先清空类别名
  [...tbody.children].forEach(item => {
    item.className = item.className.replace(/\sactive/, ``);
  });

  tr.className += " active";
};

//快捷配置列名
// {
//   title: "拣配日期",
//   dataIndex: "date",
//   key: "date"
// },
util.calcColumn = (arr1, arr2) => {
  let arr = arr1.map((item, i) => {
    let _item = {};
    _item.title = item;
    _item.dataIndex = arr2[i];
    _item.key = arr2[i];
    return _item;
  });
  return arr;
};

//深度克隆
util.deepClone = obj => {
  let newObj = Array.isArray(obj) ? [] : {};

  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] =
          obj && typeof obj[key] === "object"
            ? util.deepClone(obj[key])
            : obj[key];
      }
    }
  }
  return newObj;
};

util.executeNumber = num => {
  if (typeof num !== "number")
    throw new Error("executeNumber函数传进的参数不是一个数字类型");
  if (num >= 0 && num < 10) return `0${num}`;
  return num.toString();
};

export default util;
