import React from "react";

interface IProps {
	showHowToUse: () => void;
}

export default class Header extends React.Component<IProps> {
	render() {
		return (
			<div className="header">
				<div>
					<h1>Bahasa Panda</h1>
					<p>Yuk kita lihat makna sebenarnya!</p>
				</div>

				<button onClick={this.props.showHowToUse}>
					<img src="./assets/img/how-to-use.png" alt="How to use" />
				</button>
			</div>
		);
	}
}