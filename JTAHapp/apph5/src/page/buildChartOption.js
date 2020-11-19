const build = data => {
  const option = {
    tooltip: {
      show: false,
      trigger: "item",
      textStyle: {
        color: "#fff"
      }
    },
    geo: {
      map: "china",
      zoom: 1.2,
      regions: [
        { name: "南海诸岛", itemStyle: { opacity: 0 } },
        { name: "黑龙江", itemStyle: { areaColor: "#0679ef" } },
        { name: "吉林", itemStyle: { areaColor: "#10dea1" } },
        { name: "辽宁", itemStyle: { areaColor: "#08cdf1" } },
        { name: "内蒙古", itemStyle: { areaColor: "#0f62dd" } },
        { name: "北京", itemStyle: { areaColor: "#10dea1" } },
        { name: "天津", itemStyle: { areaColor: "#0f62dd" } },
        { name: "河北", itemStyle: { areaColor: "#0679ef" } },
        { name: "山东", itemStyle: { areaColor: "#0f62dd" } },
        { name: "山西", itemStyle: { areaColor: "#08cdf1" } },
        { name: "江苏", itemStyle: { areaColor: "#0679ef" } },
        { name: "上海", itemStyle: { areaColor: "#08cdf1" } },
        { name: "河南", itemStyle: { areaColor: "#10dea1" } },
        { name: "湖北", itemStyle: { areaColor: "#0f62dd" } },
        { name: "湖南", itemStyle: { areaColor: "#0679ef" } },
        { name: "浙江", itemStyle: { areaColor: "#0f62dd" } },
        { name: "福建", itemStyle: { areaColor: "#0679ef" } },
        { name: "广东", itemStyle: { areaColor: "#08cdf1" } },
        { name: "广西", itemStyle: { areaColor: "#0f62dd" } },
        { name: "贵州", itemStyle: { areaColor: "#10dea1" } },
        { name: "重庆", itemStyle: { areaColor: "#08cdf1" } },
        { name: "四川", itemStyle: { areaColor: "#0f62dd" } },
        { name: "云南", itemStyle: { areaColor: "#08cdf1" } },
        { name: "新疆", itemStyle: { areaColor: "#0f62dd" } },
        { name: "西藏", itemStyle: { areaColor: "#10dea1" } },
        { name: "青海", itemStyle: { areaColor: "#0679ef" } },
        { name: "甘肃", itemStyle: { areaColor: "#10dea1" } },
        { name: "宁夏", itemStyle: { areaColor: "#08cdf1" } },
        { name: "海南", itemStyle: { areaColor: "#10dea1" } },
        { name: "香港", itemStyle: { areaColor: "#08cdf1" } },
        { name: "澳门", itemStyle: { areaColor: "#08cdf1" } },
        { name: "台湾", itemStyle: { areaColor: "#0f62dd" } },
        { name: "陕西", itemStyle: { areaColor: "#0679ef" } },
        { name: "安徽", itemStyle: { areaColor: "#08cdf1" } },
        { name: "江西", itemStyle: { areaColor: "#10dea1" } }
      ],
      roam: true,
      silent: true
    },
    series: [
      {
        name: "地点",
        type: "scatter",
        symbolSize: 24,
        coordinateSystem: "geo",
        data: data.map(item => {
          return {
            name: item.name,
            value: [item.x, item.y]
          };
        }),
        label: {
          show: true,
          formatter: "{b}",
          position: "right",
          color: "#fff"
        }
      }
    ],
    animation: false
  };

  return option;
};

export default build;
