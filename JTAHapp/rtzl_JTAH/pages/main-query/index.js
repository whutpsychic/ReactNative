import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';

const pageUri = 'file:///android_asset/h5/main-query/index.html';

function checkExist(res, folder, level, parentId) {
  let arr = res.data;
  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i].parentId == parentId &&
      arr[i].folder == folder &&
      arr[i].level == level
    )
      return true;
  }
  return false;
}

class Default extends React.Component {
  state = {};

  componentDidMount() {}

  postMessage = (obj) => {
    this.refs.webview.postMessage(JSON.stringify(obj));
  };

  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref="webview"
          source={{uri: pageUri}}
          onMessage={this.onReceive}
        />
      </View>
    );
  }

  onReceive = (event) => {
    const {
      navigation,
      navigation: {navigate},
    } = this.props;
    const receivedData = JSON.parse(event.nativeEvent.data);
    const {etype} = receivedData;
    console.log(receivedData);
    //初始化完成之后互通消息然后放置数据
    if (etype === 'pageState' && receivedData.info === 'componentDidMount') {
      this.postMessage({
        etype: 'data',
        pageLoading: true,
      });

      api.getMainQueryMenuList().then((res) => {
        this.postMessage({
          etype: 'data',
          pageLoading: false,
          data: res,
        });
      });

      // api.getMainQueryMenuList2().then((res) => {
      //   // 处理菜单数据
      //   var menuData = [
      //     {name: 'risk', title: '风险管控', children: []},
      //     {name: 'publish', title: '信息发布', children: []},
      //     {name: 'urgency', title: '应急管理', children: []},
      //     {name: 'accident', title: '事故管理', children: []},
      //     {name: 'importantArea', title: '重点区域管理', children: []},
      //     {name: 'identity', title: '证照管理', children: []},
      //     {name: 'train', title: '培训管理', children: []},
      //     {name: 'about', title: '相关方信息', children: []},
      //     {name: 'danger', title: '危险品', children: []},
      //     {name: 'ecology', title: '生态修复', children: []},
      //     {name: 'fireexit', title: '消防管理', children: []},
      //     {name: 'file', title: '档案管理', children: []},
      //     {name: 'checkol', title: '在线监测', children: []},
      //   ];

      //   // 风险管控 -------------------------------------
      //   if (checkExist(res, 'group', 2, '430295437124042752'))
      //     menuData[0].children[0] = {
      //       label: '隐患排查',
      //       position: 'danger_screening_administer',
      //     };
      //   if (checkExist(res, 'riskmaster', 2, '430295437124042752'))
      //     menuData[0].children[1] = {
      //       label: '风险管控',
      //       position: 'risk_grade_control',
      //     };
      //   // 信息发布 ---------------------------
      //   if (checkExist(res, 'accountapprove', 2, '448630438131400704'))
      //     menuData[1].children[0] = {
      //       label: '新闻审批',
      //       position: 'news_approval',
      //     };

      //   if (checkExist(res, 'riskapprove', 2, '448630438131400704'))
      //     menuData[1].children[1] = {
      //       label: '风险审批',
      //       position: 'risk_tips_approval',
      //     };
      //   // 应急管理 -------------------------------
      //   if (checkExist(res, 'master', 2, '434365658105380864'))
      //     menuData[2].children[0] = {
      //       label: '应急预案',
      //       position: 'emergency_reserve_plan',
      //     };

      //   if (checkExist(res, 'recusemaster', 2, '434365658105380864'))
      //     menuData[2].children[1] = {
      //       label: '救援与评估',
      //       position: 'rescue_drill',
      //     };
      //   // 事故管理-----------------------------------
      //   if (checkExist(res, 'account', 2, '434399678767824896'))
      //     menuData[3].children[0] = {
      //       label: '事故快报',
      //       position: 'accident_quick_report',
      //     };

      //   if (checkExist(res, 'analysemaster', 2, '434399678767824896')) {
      //     menuData[3].children[1] = {
      //       label: '安全生产',
      //       position: 'safe_producing_calendar',
      //     };

      //     menuData[3].children[2] = {
      //       label: '事故查询',
      //       position: 'accident_query',
      //     };
      //   }
      //   // 重点区域管理 ------------------------------
      //   if (checkExist(res, 'record', 2, '448631002823131136'))
      //     menuData[4].children[0] = {
      //       label: '酸性水库',
      //       position: 'acidic_reservoir_info',
      //     };

      //   if (checkExist(res, 'rainrecord', 2, '448631002823131136'))
      //     menuData[4].children[1] = {label: '降雨量', position: 'rain_info'};

      //   if (checkExist(res, 'wasteRecord', 2, '448631002823131136'))
      //     menuData[4].children[2] = {
      //       label: '废水处理',
      //       position: 'waste_water',
      //     };

      //   // 证照管理 ------------------------------
      //   if (checkExist(res, 'master', 2, '438365902635794432'))
      //     menuData[5].children[0] = {
      //       label: '安环证照',
      //       position: 'safe_env_certificates',
      //     };

      //   // 培训管理 ------------------------------
      //   if (checkExist(res, 'master', 2, '427469331622789120'))
      //     menuData[6].children[0] = {
      //       label: '教育培训',
      //       position: 'educating_stand_book',
      //     };
      //   // 相关方信息 ------------------------------
      //   if (checkExist(res, 'master', 2, '438003073927872512'))
      //     menuData[7].children[0] = {
      //       label: '相关方信息',
      //       position: 'relationship_info',
      //     };

      //   // 危险品 ------------------------------
      //   if (checkExist(res, 'master', 2, '429212870207602688'))
      //     menuData[8].children[0] = {
      //       label: '危险品信息',
      //       position: 'danger_chemical',
      //     };
      //   // 生态修复 ------------------------------
      //   if (checkExist(res, 'master', 2, '429590717006872576'))
      //     menuData[9].children[0] = {
      //       label: '生态修复',
      //       position: 'ecology_repair_info',
      //     };
      //   // 消防管理 ------------------------------
      //   if (checkExist(res, 'check', 2, '442997435942305792'))
      //     menuData[10].children[0] = {
      //       label: '消防管理',
      //       position: 'fire_control_manage',
      //     };

      //   // 档案管理 ------------------------------
      //   if (checkExist(res, 'lawmaster', 2, '439057876812562432'))
      //     menuData[11].children[0] = {
      //       label: '法律法规',
      //       position: 'law_standard',
      //     };
      //   if (checkExist(res, 'account', 2, '439057876812562432'))
      //     menuData[11].children[1] = {
      //       label: '履职报告',
      //       position: 'duties_report',
      //     };
      //   if (checkExist(res, 'masterNotice', 2, '439057876812562432'))
      //     menuData[11].children[2] = {
      //       label: '文件通知',
      //       position: 'file_notice',
      //     };
      //   if (checkExist(res, 'view', 2, '439057876812562432')) {
      //     menuData[11].children[3] = {
      //       label: '安全档案',
      //       position: 'archives_safe',
      //     };
      //     menuData[11].children[4] = {
      //       label: '环保档案',
      //       position: 'archives_env',
      //     };
      //     menuData[11].children[5] = {
      //       label: '职业卫生',
      //       position: 'archives_occupation',
      //     };
      //     menuData[11].children[6] = {
      //       label: '规章制度',
      //       position: 'archives_rules',
      //     };
      //     menuData[11].children[7] = {
      //       label: '其他档案',
      //       position: 'archives_others',
      //     };
      //   }

      //   // 在线监测 ------------------------------
      //   if (checkExist(res, 'masterException', 2, '459703264758202368'))
      //     menuData[12].children[0] = {
      //       label: '异常（集团）',
      //       position: 'abnormal_info_group',
      //     };

      //   if (checkExist(res, 'accountException', 2, '459703264758202368'))
      //     menuData[12].children[1] = {
      //       label: '异常（企业）',
      //       position: 'abnormal_info_enterprise',
      //     };

      //   if (checkExist(res, 'autolist', 2, '459703264758202368'))
      //     menuData[12].children[2] = {
      //       label: '实时数据',
      //       position: 'monitor_oldata_list2',
      //     };

      //   // 去掉空项
      //   var _menuData = [];

      //   menuData.map((item, i) => {
      //     if (!item.children.length) return;
      //     _menuData.push(item);
      //   });

      //   _menuData = _menuData.map((item) => {
      //     let arr = [];
      //     item.children.map((_item) => {
      //       if (_item) arr.push(_item);
      //     });
      //     item.children = arr;
      //     return item;
      //   });

      //   this.postMessage({
      //     etype: 'data',
      //     pageLoading: false,
      //     data: _menuData,
      //   });
      // });
    }
    //
    else if (etype === 'navigate') {
      const {position} = receivedData;
      navigate(position);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Default;
