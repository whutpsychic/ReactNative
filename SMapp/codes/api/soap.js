const getConditionsIn = obj => {
  let str = '';
  for (let i in obj) {
    // // 区分对待数组
    // if (obj[i] instanceof Array) {
    //   str += `<` + i + `>[` + obj[i] + `]</` + i + `>`;
    // } else {
      str += `<` + i + `>` + obj[i] + `</` + i + `>`;
    // }
  }
  console.log(str);
  return str;
};

const RequestWebService = (url, condition) => {
  return new Promise((resolve, reject) => {
    var xmlhttp;

    //这是我们在第一步中创建的Web服务的地址，为什么是127.0.0.1呢？因为涉及到nginx转发问题
    var URL = 'http://218.86.88.125:5001/ZJTYWebService.asmx';
    // var URL = 'http://218.86.88.125:6001/ZJTYWebService_test.asmx';

    //ff浏览器
    xmlhttp = new XMLHttpRequest();
    //ie浏览器
    // xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    //在这处我们拼接SOAP报文，需要将参数拼接 -->

    var data =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<soap:Body>' +
      '<' +
      url +
      ' xmlns="http://tempuri.org/">' +
      // 注意：这里要将参数拼接进去
      // '<uname>admin</uname>' +
      // '<pwd>13579</pwd>' +
      getConditionsIn(condition) +
      '</' +
      url +
      '>' +
      '</soap:Body>' +
      '</soap:Envelope>';

    //创建连接
    xmlhttp.open('POST', URL, true);

    xmlhttp.setRequestHeader('content-type', 'text/xml; charset=utf-8');
    // 这里要设置SOAPAction
    xmlhttp.setRequestHeader('SOAPAction', 'http://tempuri.org/' + url);

    //回调函数，一定要在send（）方法之前
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        resolve(xmlhttp);
      }
    };
    //发送soap请求协议
    xmlhttp.send(data);
  });
};

export default RequestWebService;
