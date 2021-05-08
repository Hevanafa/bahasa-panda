import React from "react";

import Header from "./components/Header";
import HowToUseModal from "./components/HowToUseModal";

import "./App.scss";

interface IState {
	inputText: string;
	shift: string;

	showConvertedResult: boolean;
	convertedText: string;

	isDarkMode: boolean;
	blurBody: boolean;
	showHowToUse: boolean;

	hasSeenPanda: boolean;
	isPandaVisible: boolean;
}

export default class App extends React.Component<{}, IState> {
	state = {
		inputText: "",
		shift: "0",

		showConvertedResult: false,
		convertedText: "",

		isDarkMode: false,
		blurBody: false,
		showHowToUse: false,

		hasSeenPanda: false,
		isPandaVisible: false,
	}

	constructor(props: any) {
		super(props);

		this.handleTextareaChange = this.handleTextareaChange.bind(this);
		this.handleShiftChange = this.handleShiftChange.bind(this);

		this.showHowToUse = this.showHowToUse.bind(this);
		this.hideHowToUse = this.hideHowToUse.bind(this);

		this.showPanda = this.showPanda.bind(this);
		this.hidePanda = this.hidePanda.bind(this);
		this.toggleShowPanda = this.toggleShowPanda.bind(this);

		this.toggleDarkMode = this.toggleDarkMode.bind(this);
	}

	handleTextareaChange(event: any) {
		this.setState({ inputText: event.target.value });
	}

	handleShiftChange(event: any) {
		this.setState({ shift: event.target.value });
	}

	convertText() {
		const { inputText: inputValue, shift } = this.state;
		const inputText = inputValue.trim();
		const shiftVal = +shift;

		if (!inputValue.trim().length) {
			alert("Kolom input tidak boleh kosong!");
			return;
		}

		if (isNaN(shiftVal)) {
			alert("Geser harus berupa bilangan!");
			return;
		}

		var cOrd: number;

		this.setState({
			showConvertedResult: true,
			convertedText: inputText.replace(/[a-z]/gi, match => {
				// console.log(match + " " + shift);
				// console.log((match.charCodeAt(0) - 97 + shift));

				if (match.match(/[a-z]/)) {
					for (cOrd = match.charCodeAt(0) - 97 + shiftVal; cOrd < 0; cOrd += 26);
					cOrd %= 26;
					return String.fromCharCode(cOrd + 97);
				} else if (match.match(/[A-Z]/)) {
					for (cOrd = match.charCodeAt(0) - 65 + shiftVal; cOrd < 0; cOrd += 26);
					cOrd %= 26;
					return String.fromCharCode(cOrd + 65);
				}

				return match;
			})
		});
	}

	backToStart() {
		this.setState({ showConvertedResult: false });
	}

	showHowToUse() {
		this.setState({ blurBody: true }, () => {
			window.setTimeout(() => {
				this.setState({ showHowToUse: true });
			}, 200);
		});
	}

	hideHowToUse() {
		this.setState({ showHowToUse: false }, () => {
			window.setTimeout(() => {
				this.setState({ blurBody: false });
			}, 300);
		});
	}

	showPanda() {
		this.setState({
			hasSeenPanda: true,
			isPandaVisible: true
		});
	}

	hidePanda() {
		this.setState({ isPandaVisible: false });
	}

	toggleShowPanda() {
		this.setState({
			hasSeenPanda: true,
			isPandaVisible: !this.state.isPandaVisible
		});
	}

	toggleDarkMode() {
		this.setState({
			isDarkMode: !this.state.isDarkMode
		});
	}

	render() {
		return (
			<div className={"app" + 
				(this.state.isDarkMode ? " dark-mode" : "")
			}>
				<div className="start-page">
					<div className="under-body">
						<img className="bg"
							src="./assets/img/background-img.png"
							alt="background" />
						<img className="panda"
							src="./assets/img/panda-boy.png"
							alt="Panda Boy" />
					</div>

					<div className={
						"background-overlay" +
						(this.state.isPandaVisible || this.state.hasSeenPanda ? " hidden" : "")
					}
						onClick={this.showPanda}
					>
						Sentuh untuk melihat rahasia.
					</div>

					<Header
						showHowToUse={this.showHowToUse}
						isDarkMode={this.state.isDarkMode}
						toggleDarkMode={this.toggleDarkMode}
						/>

					<div className={
						"body" +
						(this.state.blurBody ? " blurred" : "") +
						(this.state.isPandaVisible ? " show-panda" : "") +
						(this.state.isDarkMode ? " dark-mode" : "")
					}>
						{
							this.state.showConvertedResult ?
								<>
									<div className="drag-handler"
										onClick={this.toggleShowPanda} />

									<div className="input-group">
										<div className="label">Kalimat yang dimasukkan</div>
										<div className="textbox">
											{this.state.inputText}
										</div>
									</div>

									<div className="input-group">
										<div className="label">Hasil (Geser {Number(this.state.shift)})</div>
										<div className="textbox">
											{this.state.convertedText}
										</div>
									</div>

									<div className="flex-centre">
										<button className="btn-convert"
											onClick={this.backToStart.bind(this)}>
											Konversi lagi
									</button>
									</div>
								</>
								:
								<>
									<div className="drag-handler"
										onClick={this.toggleShowPanda} />

									<div className="input-group">
										<label htmlFor="input">Kalimat yang ingin diacak</label>
										<textarea
											id="input"
											placeholder="Masukkan teks"
											value={this.state.inputText}
											onChange={this.handleTextareaChange}></textarea>
									</div>

									<div className="input-group">
										<label htmlFor="shift">Geser Huruf</label>
										<input type="number"
											value={this.state.shift}
											onChange={this.handleShiftChange}
											pattern="-?\d+"
											min="-25"
											max="25" />
									</div>
 
									<div className="flex-centre">
										<button className="btn-convert"
											onClick={this.convertText.bind(this)}>
											Konversi
										</button>
									</div>
								</>
						}
					</div>


					<div className={
						"footer" +
						(this.state.blurBody ? " blurred" : "") +
						(this.state.isPandaVisible ? " hidden" : "")
					}>
						Graphics Design: T3CH_Kitsune<br />
						Programming: Hevanafa<br />
						Panda by Hevanafa<br />
						May 2021, T3CH_Kitsu &amp; Hevanafa
					</div>

					<HowToUseModal
						hideHowToUse={this.hideHowToUse}
						showHowToUse={this.state.showHowToUse} />

				</div>
			</div>
		);
	}
}