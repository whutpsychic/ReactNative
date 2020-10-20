import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import DatePicker from "../components/DatePicker/index";
import moment from "moment";
import PageLoading from "../components/PageLoading/index";

const { MonthPicker } = DatePicker;

const switchMonthToStr = x => {
	if (typeof x === "number") x = x.toString();
	switch (x) {
		case "0":
			return "一月";
		case "1":
			return "二月";
		case "2":
			return "三月";
		case "3":
			return "四月";
		case "4":
			return "五月";
		case "5":
			return "六月";
		case "6":
			return "七月";
		case "7":
			return "八月";
		case "8":
			return "九月";
		case "9":
			return "十月";
		case "10":
			return "十一月";
		case "11":
			return "十二月";
		default:
			return "未知月份";
	}
};

const getWeekDay = date => {
	let week = moment(date).day();
	switch (week) {
		case 1:
			return "周一";
		case 2:
			return "周二";
		case 3:
			return "周三";
		case 4:
			return "周四";
		case 5:
			return "周五";
		case 6:
			return "周六";
		case 0:
			return "周日";
		default:
			return "未知";
	}
};

class Calendar extends React.Component {
	state = {
		today: {
			year: moment().year(),
			month: moment().month() + 1,
			date: moment().date()
		},
		selected: null
	};

	componentDidMount() {}

	static weekDays = ["日", "一", "二", "三", "四", "五", "六"];

	static translateDataArr = (y, m, deviation) => {
		//先根据年月份计算有多少天
		let days = moment(`${y}-${m}`).daysInMonth();
		//再根据第一天是周几给数组填充
		let fd = moment(`${y}-${m}`).day();
		let dataArr = [];
		//先注入偏移量
		for (let i = 0; i < deviation; i++) {
			dataArr.push("");
		}
		for (let i = 1; i < fd; i++) {
			dataArr.push("");
		}
		for (var i = 1; i < days + 1; i++) {
			dataArr.push(i);
		}
		let L = dataArr.length;
		let afteritemnums = 7 - (L % 7);
		for (let i = 0; i < afteritemnums; i++) {
			dataArr.push("");
		}
		let resultArr = [[], [], [], [], [], [], []];
		for (let i = 0; i < dataArr.length; i++) {
			let o = i % 7;
			let n = parseInt(i / 7, 10);
			resultArr[n][o] = dataArr[i];
		}
		//去除空数组
		resultArr = resultArr.filter(item => {
			return item.length;
		});

		return resultArr;
	};

	static calcClassName = ({ year, month, date }, today, selected) => {
		//table-text-item
		let tdy = moment().date();
		let cls = `table-text-item`;
		if (selected) {
			cls += " selected";
		}
		if (year === today.year && month === today.month && date === tdy) {
			cls += " today";
		}
		return cls;
	};

	//state:0-无 state:1-伤 state:2-亡
	static renderExtraInfo = obj => {
		let state = 0;
		if (obj instanceof Object) {
			state = obj.state;
		}
		if (typeof state === "string") state = parseInt(state, 10);
		switch (state) {
			case 0:
				return null;
			case 1:
				return <ExtraSign text="伤" color={"orange"} inner />;
			case 2:
				return <ExtraSign text="亡" color={"red"} inner />;
			default:
				return null;
		}
	};

	render() {
		const {
			year = moment().year(),
			month = moment().month() + 1,
			data,
			deviation = 0
		} = this.props;
		const dataArr = Calendar.translateDataArr(year, month, deviation);
		const { today, selected } = this.state;
		return (
			<div className="calendar-container-outer">
				<div className="calendar-container">
					<table>
						{/*第一行*/}
						<thead>
							<tr>
								{Calendar.weekDays.map((item, i) => {
									return (
										<th key={`item${i}`}>
											<div className="table-item-outer">
												<div className="table-item">{item}</div>
											</div>
										</th>
									);
								})}
							</tr>
						</thead>
						{/*后续行*/}
						<tbody>
							{dataArr.map((item, i) => {
								return (
									<tr key={`trk${i}`}>
										{item.map((_item, j) => {
											let judgeStr = `${year}-${util.executeNumber(
												month
											)}-${util.executeNumber(_item || 0)}`;
											let dataItem = data.filter(_item_ => {
												return _item_.date === judgeStr;
											})[0];
											return (
												<td key={`_itemk${j}`}>
													<div className={"table-item-outer"}>
														<span
															className={Calendar.calcClassName(
																{ year, month, date: _item },
																today,
																selected == _item
															)}
															onClick={e => this.onClickItem(e, dataItem)}
														>
															{_item}
														</span>
														{Calendar.renderExtraInfo(dataItem)}
													</div>
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}

	onClickItem = (e, dataItem) => {
		let item = e.target.innerHTML;
		if (item) {
			this.setState({
				selected: item
			});
		}
		const { onClick } = this.props;
		if (typeof onClick === "function") onClick(dataItem);
	};
}

class ExtraSign extends React.Component {
	render() {
		const { text, color, inner } = this.props;
		return (
			<span className={`calendar-extra-sign ${color}${inner ? " inner" : ""}`}>
				{text}
			</span>
		);
	}
}

class App extends React.Component {
	state = {
		pageLoading: false,
		monthText: switchMonthToStr(new Date().getMonth()),
		//state:0-无 state:1-伤 state:2-亡
		// 		{
		// 			date: "2020-09-01",
		// 			state: 0,
		// 			info: "xxxx事故，发生了这样这样很糟糕的事故1"
		// 		}
		data: [],
		info: "",
		year: moment().year(),
		month: moment().month() + 1
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
		// ==================================
	}

	render() {
		const { pageLoading } = this.state;
		const { monthText, data, info, year, month } = this.state;
		return (
			<div className="app-container">
				{pageLoading ? <PageLoading /> : null}
				<div className="app-contents">
					<TopTitle title="安全生产日历" canBack />
					<MonthPicker onChange={this.onChangeDate} />
					<div className="spliter" />
					<div className="for-display">
						<ul className="legends">
							<li>
								<span>当日有死亡</span>
								<ExtraSign text={"亡"} color={"red"} />
							</li>
							<li>
								<span>当日有重伤</span>
								<ExtraSign text={"伤"} color={"orange"} />
							</li>
						</ul>
						<span className="monthText">{monthText}</span>
					</div>
					<Calendar
						year={year}
						month={month}
						data={data}
						onClick={this.onClickCalendar}
						deviation={1}
					/>
					<div className="spliter" />
					<div className="text-info">
						<span>{info}</span>
					</div>
				</div>
			</div>
		);
	}

	onChangeDate = x => {
		let year = x.year();
		let month = x.month();
		util.traceBack("onChangeDate", { year, month });
		this.setState({
			year,
			month: month + 1,
			monthText: switchMonthToStr(month)
		});
	};

	onClickCalendar = dataItem => {
		util.traceBack("onClickItem", { dataItem });
		if (dataItem) {
			this.setState({
				info: dataItem.info
			});
		} else {
			this.setState({
				info: ""
			});
		}
	};
}

export default App;
