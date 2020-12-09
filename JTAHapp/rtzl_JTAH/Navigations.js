import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';
import ImageIcon from './navigation-styles/imageIcon.js';
import styles from './navigation-styles/style.js';
import config from './config/index';
// ===================================== //
import Logo from './pages/logo/index';
import Login from './pages/login/index';
// pdf 阅览页
import pdf from './pages/_pdf';
// table 表格页
import table from './pages/_table/index';
// -------------------------------------------
import Main_Home from './pages/main-home/index';
import Main_Mine from './pages/main-mine/index';
import Main_Query from './pages/main-query/index';
import Main_Video from './pages/main-video/index';
// -------------------------------------------
// 通用列表编辑/新增页面
// import common_list_edit from './pages/common-list-edit';
// 视频监测播放
import common_video_player from './pages/common-video-player';
// -------------------------------------------
// 隐患排查
import danger_screening_administer from './pages/danger-screening-administer/index';
// 风险分级管控
import risk_grade_control from './pages/risk-grade-control/index';
// 风险分级管控数据列表和详情
import risk_grade_control_list from './pages/risk-grade-control-list/index';
// 应急预案管理
import emergency_reserve_plan from './pages/emergency-reserve-plan/index';
// 救援演练
import rescue_drill from './pages/rescue-drill/index';
// 救援演练列表详情
import rescue_drill_list from './pages/rescue-drill-list/index';
// 事故快报
import accident_quick_report from './pages/accident-quick-report/index';
// 事故查询
import accident_query from './pages/accident-query/index';
// 酸型水库信息
import acidic_reservoir_info from './pages/acidic-reservoir-info/index';
// 酸型水库信息(编辑)
import acidic_reservoir_edit from './pages/acidic-reservoir-edit/index';
// 降雨量信息
import rain_info from './pages/rain-info/index';
// 降雨量信息(编辑)
import rain_info_edit from './pages/rain-info-edit/index';
// 废水处理量
import waste_water from './pages/waste-water/index';
// 废水处理量(编辑)
import waste_water_edit from './pages/waste-water-edit/index';
// 安环证照管理
import safe_env_certificates from './pages/safe-env-certificates/index';
// 教育培训台账
import educating_stand_book from './pages/educating-stand-book/index';
// 相关方信息
import relationship_info from './pages/relationship-info/index';
// 危险化学品管理
import danger_chemical from './pages/danger-chemical/index';
// 法律法规
import law_standard from './pages/law-standard/index';
// 履职报告
import duties_report from './pages/duties-report/index';
// 文件通知
import file_notice from './pages/file-notice/index';
// 异常信息（集团）
import abnormal_info_group from './pages/abnormal-info-group/index';
// 异常信息（企业）
import abnormal_info_enterprise from './pages/abnormal-info-enterprise/index';
// 异常信息（企业）编辑
import abnormal_info_enterprise_edit from './pages/abnormal-info-enterprise-edit/index';
// 安全档案资料
import archives_safe from './pages/archives-safe/index';
// 环保档案资料
import archives_env from './pages/archives-env/index';
// 职业卫生档案资料
import archives_occupation from './pages/archives-occupation/index';
// 规章制度
import archives_rules from './pages/archives-rules/index';
// 其他
import archives_others from './pages/archives-others/index';
// 在线监测实时数据
import monitor_oldata_list from './pages/monitor-oldata-list/index';
import monitor_oldata_list2 from './pages/monitor-oldata-list2/index';
// 在线监测实时数据（历史数据）
import monitor_oldata_history from './pages/monitor-oldata-history/index';
import monitor_oldata_history2 from './pages/monitor-oldata-history2/index';

// 生态信息修复
import ecology_repair_info from './pages/ecology-repair-info/index';
// 消防资料列表
import fire_control_data_list from './pages/fire-control-data-list/index';
// 消防管理
import fire_control_manage from './pages/fire-control-manage/index';
// 安环信息发布
import safe_env_info_publish from './pages/safe-env-info-publish/index';
// 安环目标统计
import safe_env_target_statistic from './pages/safe-env-target-statistic/index';
// 安全生产日历
import safe_producing_calendar from './pages/safe-producing-calendar/index';
// 新闻审批
import news_approval from './pages/news-approval/index';
// 新闻预览
import news_overview from './pages/news-overview/index';
// 风险提示审批
import risk_tips_approval from './pages/risk-tips-approval/index';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBarOptions={{
        labelStyle: styles.menuLabel,
        style: {
          height: config.bottomTabHeight,
          paddingTop: config.bottomTabPaddingVertical,
          paddingBottom: config.bottomTabPaddingVertical,
        },
        activeTintColor: styles.menuTabActiveTintColor,
        activeBackgroundColor: styles.menuTabActiveBackgroundColor,
      }}>
      <Tab.Screen
        name="home"
        component={Main_Home}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({focused}) => {
            return <ImageIcon name="home" focused={focused} badgeName="m1" />;
          },
        }}
      />
      <Tab.Screen
        name="home-query"
        component={Main_Query}
        options={{
          tabBarLabel: '信息管理',
          tabBarIcon: ({focused}) => {
            return <ImageIcon name="query" focused={focused} badgeName="m2" />;
          },
        }}
      />
      <Tab.Screen
        name="home-video"
        component={Main_Video}
        options={{
          tabBarLabel: '视频监测',
          tabBarIcon: ({focused}) => {
            return <ImageIcon name="video" focused={focused} badgeName="m3" />;
          },
        }}
      />
      <Tab.Screen
        name="home-mine"
        component={Main_Mine}
        options={{
          tabBarLabel: '个人中心',
          tabBarIcon: ({focused}) => {
            return <ImageIcon name="mine" focused={focused} badgeName="m4" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

class App extends React.Component {
  render() {
    const {initializing, isLogin} = this.props;
    return (
      <NavigationContainer>
        <StatusBar translucent={false} />
        <Stack.Navigator initialRouteName="main" headerMode="none">
          {initializing ? (
            <Stack.Screen name="logo" component={Logo} />
          ) : isLogin ? (
            <Fragment>
              {<Stack.Screen name="pdf" component={pdf} />}
              {<Stack.Screen name="table" component={table} />}
              <Stack.Screen
                name="common_video_player"
                component={common_video_player}
              />
              <Stack.Screen name="main" component={BottomTabs} />
              <Stack.Screen
                name="danger_screening_administer"
                component={danger_screening_administer}
              />
              <Stack.Screen
                name="risk_grade_control"
                component={risk_grade_control}
              />
              <Stack.Screen
                name="risk_grade_control_list"
                component={risk_grade_control_list}
              />
              <Stack.Screen
                name="emergency_reserve_plan"
                component={emergency_reserve_plan}
              />
              <Stack.Screen name="rescue_drill" component={rescue_drill} />
              <Stack.Screen
                name="rescue_drill_list"
                component={rescue_drill_list}
              />
              <Stack.Screen
                name="accident_quick_report"
                component={accident_quick_report}
              />
              <Stack.Screen name="accident_query" component={accident_query} />
              <Stack.Screen
                name="acidic_reservoir_info"
                component={acidic_reservoir_info}
              />
              <Stack.Screen
                name="acidic_reservoir_edit"
                component={acidic_reservoir_edit}
              />
              <Stack.Screen name="rain_info" component={rain_info} />
              <Stack.Screen name="rain_info_edit" component={rain_info_edit} />
              <Stack.Screen name="waste_water" component={waste_water} />
              <Stack.Screen
                name="waste_water_edit"
                component={waste_water_edit}
              />
              <Stack.Screen
                name="safe_env_certificates"
                component={safe_env_certificates}
              />
              <Stack.Screen
                name="educating_stand_book"
                component={educating_stand_book}
              />
              <Stack.Screen
                name="relationship_info"
                component={relationship_info}
              />
              <Stack.Screen
                name="danger_chemical"
                component={danger_chemical}
              />
              <Stack.Screen name="law_standard" component={law_standard} />
              <Stack.Screen name="duties_report" component={duties_report} />
              <Stack.Screen name="file_notice" component={file_notice} />
              <Stack.Screen
                name="abnormal_info_group"
                component={abnormal_info_group}
              />
              <Stack.Screen
                name="abnormal_info_enterprise"
                component={abnormal_info_enterprise}
              />
              <Stack.Screen
                name="abnormal_info_enterprise_edit"
                component={abnormal_info_enterprise_edit}
              />
              <Stack.Screen name="archives_safe" component={archives_safe} />
              <Stack.Screen name="archives_env" component={archives_env} />
              <Stack.Screen
                name="archives_occupation"
                component={archives_occupation}
              />
              <Stack.Screen name="archives_rules" component={archives_rules} />
              <Stack.Screen
                name="archives_others"
                component={archives_others}
              />
              <Stack.Screen
                name="monitor_oldata_list"
                component={monitor_oldata_list}
              />
              <Stack.Screen
                name="monitor_oldata_list2"
                component={monitor_oldata_list2}
              />
              <Stack.Screen
                name="monitor_oldata_history"
                component={monitor_oldata_history}
              />
              <Stack.Screen
                name="monitor_oldata_history2"
                component={monitor_oldata_history2}
              />
              <Stack.Screen
                name="risk_tips_approval"
                component={risk_tips_approval}
              />
              <Stack.Screen
                name="ecology_repair_info"
                component={ecology_repair_info}
              />
              <Stack.Screen
                name="fire_control_data_list"
                component={fire_control_data_list}
              />
              <Stack.Screen
                name="fire_control_manage"
                component={fire_control_manage}
              />
              <Stack.Screen
                name="safe_env_info_publish"
                component={safe_env_info_publish}
              />
              <Stack.Screen
                name="safe_env_target_statistic"
                component={safe_env_target_statistic}
              />
              <Stack.Screen
                name="safe_producing_calendar"
                component={safe_producing_calendar}
              />
              <Stack.Screen name="news_approval" component={news_approval} />
              <Stack.Screen name="news_overview" component={news_overview} />
            </Fragment>
          ) : (
            <Stack.Screen name="login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state, props) => {
  return state;
};

export default connect(mapStateToProps)(App);
