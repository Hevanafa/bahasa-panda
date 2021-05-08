import React from "react";

interface IProps {
	showHowToUse: () => void;

	isDarkMode: boolean;
	toggleDarkMode: () => void;
}

export default class Header extends React.Component<IProps> {
	render() {
		const { isDarkMode, showHowToUse, toggleDarkMode } = this.props;

		return (
			<div className={
				"header" +
				(isDarkMode ? " dark-mode" : "")
			}>
				<div className="left-group">
					<h1>Bahasa Panda</h1>
					<p>Yuk kita lihat makna sebenarnya!</p>
				</div>

				<div className="right-group">
					<button onClick={toggleDarkMode}>
						<img src={
							isDarkMode ?
								"./assets/img/dark-mode/dark-mode-on.png" :
								"./assets/img/dark-mode/dark-mode-off.png"
						} alt="How to use" />
					</button>

					<button onClick={showHowToUse}>
						<img src={
							"./assets/img/" +
							(isDarkMode ? "dark-mode/" : "") +
							"how-to-use.png"
						} alt="How to use" />
					</button>
				</div>
			</div>
		);
	}
}