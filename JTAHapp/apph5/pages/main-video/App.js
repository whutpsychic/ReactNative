import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import { QMap, HeatMap, Marker, MarkerList, Info } from "react-tmap";

class App extends React.Component {
	state = {
		positions: [],
		info: []
	};

	componentDidMount() {
		//告知RN页面已经装载完毕
		util.traceBack("pageState", "componentDidMount");
		//监听事件以及时读取RN传回的数据
		document.addEventListener("message", event => {
			let res = JSON.parse(event.data);
			if (res.etype === "data") {
				let obj = { ...res };
				delete obj.etype;
				this.setState({
					...obj
				});
			} else if (res.etype === "event") {
				let { event, args } = res;
				if (typeof this[event] === "function") this[event](args);
			}
		});

		// ***************************************************
		// setTimeout(() => {
		// 	this.setState({
		// 		positions: [
		// 			{ lat: 39.984104, lng: 116.307503, text: "10" },
		// 			{ lat: 40.984104, lng: 117.307503, text: "12" },
		// 			{ lat: 41.984104, lng: 118.307503, text: "16" },
		// 			{ lat: 42.984104, lng: 119.307503, text: "8" },
		// 			{ lat: 43.984104, lng: 120.307503, text: "9" },
		// 			{ lat: 44.984104, lng: 121.307503, text: "17" }
		// 		],
		// 		info: [
		// 			{ lat: 39.984104, lng: 116.307503, text: "文字1" },
		// 			{ lat: 40.984104, lng: 117.307503, text: "文字2" },
		// 			{ lat: 41.984104, lng: 118.307503, text: "文字3" },
		// 			{ lat: 42.984104, lng: 119.307503, text: "文字4" }
		// 		]
		// 	});
		// }, 4000);
	}

	render() {
		const { positions, info } = this.state;
		return (
			<div className="app-container">
				<div className="app-contents">
					<TopTitle title="视频监测" />
					<div className="map-container">
						<QMap
							center={{ lat: 39.984104, lng: 116.307503 }}
							style={{ height: "800px" }}
							// events={{
							// 	idle: map => this.handleMapIdle(map)
							// }}
						>
							{positions.map((item, i) => {
								return (
									<Marker
										key={`mk${i}`}
										position={{ lat: item.lat, lng: item.lng }}
										visible
										// 标记提示文案
										decoration={item.text}
										// events={{
										// 	click: this.handleMarkerClick
										// }}
									/>
								);
							})}
							{info.map((item, i) => {
								return (
									<Info
										key={`info${i}`}
										content={item.text}
										visible={true}
										position={{ lat: item.lat, lng: item.lng }}
									/>
								);
							})}
						</QMap>
					</div>
				</div>
			</div>
		);
	}

	handleMarkerClick = () => {
		alert("hell");
	};
}

export default App;
