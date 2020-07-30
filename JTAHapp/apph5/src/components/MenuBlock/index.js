import React from "react";
import "./index.css";

import mbgl from "./mbgl.png";
import xxfb from "./xxfb.png";
import yjgl from "./yjgl.png";
import sggl from "./sggl.png";
import zdqy from "./zdqy.png";
import gztx from "./gztx.png";
import gpjd from "./gpjd.png";
import fxtx from "./fxtx.png";

const imgs = {};

imgs.mbgl = mbgl;
imgs.xxfb = xxfb;
imgs.yjgl = yjgl;
imgs.sggl = sggl;
imgs.zdqy = zdqy;
imgs.gztx = gztx;
imgs.gpjd = gpjd;
imgs.fxtx = fxtx;

export default class extends React.Component {
	render() {
		const { data, onClick } = this.props;
		return (
			<div className="icon-menu-block-item-container">
				{data.map((item, i) => {
					return (
						<div
							key={`item${i}`}
							className="icon-menu-block-item"
							onClick={() => onClick(item)}
						>
							<img alt="img" src={imgs[`${item.icon}`]} />
							<p>{item.title}</p>
						</div>
					);
				})}
			</div>
		);
	}
}
