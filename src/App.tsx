import React from "react";

import Header from "./components/Header";
import HowToUseModal from "./components/HowToUseModal";

import "./App.scss";
import ConversionTable from "./components/ConversionTable";
import ConversionResult from "./components/ConversionResult";
import Footer from "./components/Footer";
import ConversionStart from "./components/ConversionStart";

interface IState {
	inputText: string;
	shift: string;

	isConversionResultVisible: boolean;
	convertedText: string;

	isDarkMode: boolean;
	blurBody: boolean;
	showHowToUse: boolean;

	hasSeenPanda: boolean;
	isPandaVisible: boolean;

	isDecryptionMode: boolean;
	isConversionTableVisible: boolean;
}

export default class App extends React.Component<{}, IState> {
	state = {
		inputText: "",
		shift: "0",

		isConversionResultVisible: false,
		convertedText: "",

		isDarkMode: false,
		blurBody: false,
		showHowToUse: false,

		hasSeenPanda: false,
		isPandaVisible: false,

		isDecryptionMode: false,
		isConversionTableVisible: false,
	}

	constructor(props: any) {
		super(props);

		this.bindCommonFunctions();
	}

	bindCommonFunctions() {
		this.handleTextareaChange = this.handleTextareaChange.bind(this);
		this.handleShiftChange = this.handleShiftChange.bind(this);

		this.showHowToUse = this.showHowToUse.bind(this);
		this.hideHowToUse = this.hideHowToUse.bind(this);

		this.showPanda = this.showPanda.bind(this);
		this.hidePanda = this.hidePanda.bind(this);
		this.toggleShowPanda = this.toggleShowPanda.bind(this);

		this.toggleDarkMode = this.toggleDarkMode.bind(this);

		this.handleDecryptionChange = this.handleDecryptionChange.bind(this);
	}

	handleTextareaChange(event: any) {
		this.setState({ inputText: event.target.value });
	}

	handleShiftChange(event: any) {
		if (event.target.value < 0)
			this.setState({ shift: "0" });
		else this.setState({ shift: event.target.value });
	}

	convertText() {
		const { inputText: inputValue, shift } = this.state;
		const inputText = inputValue.trim();
		let shiftVal = +shift;

		if (!inputValue.trim().length) {
			alert("Kolom input tidak boleh kosong!");
			return;
		}

		if (isNaN(shiftVal)) {
			alert("Geser harus berupa bilangan!");
			return;
		}

		if (this.state.isDecryptionMode)
			shiftVal *= -1;

		this.setState({
			isConversionResultVisible: true,
			convertedText: this.getShiftedText(inputText, shiftVal)
		});
	}

	getShiftedText(original: string, shift: number) {
		var cOrd: number;

		return original.replace(/[a-z]/gi, match => {
			// console.log(match + " " + shift);
			// console.log((match.charCodeAt(0) - 97 + shift));

			if (match.match(/[a-z]/)) {
				for (cOrd = match.charCodeAt(0) - 97 + shift; cOrd < 0; cOrd += 26);
				cOrd %= 26;
				return String.fromCharCode(cOrd + 97);
			} else if (match.match(/[A-Z]/)) {
				for (cOrd = match.charCodeAt(0) - 65 + shift; cOrd < 0; cOrd += 26);
				cOrd %= 26;
				return String.fromCharCode(cOrd + 65);
			}

			return match;
		});
	}

	getShiftedTextArray(original: string) {
		return [...new Array(26)].map((_, idx) =>
			this.getShiftedText(original, idx)
		);
	}

	backToStart() {
		this.setState({
			isConversionResultVisible: false,
			isConversionTableVisible: false,
		});
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
		}, () => {
			this.saveConfig();
		});
	}

	toggleDarkMode() {
		this.setState({
			isDarkMode: !this.state.isDarkMode
		}, () => {
			this.saveConfig();
		});
	}

	handleDecryptionChange(event: any) {
		// console.error("hDC checked", event.target.checked);

		this.setState({
			isDecryptionMode: event.target.checked
		});
	}

	showConversionTable() {
		this.setState({ isConversionTableVisible: true });
	}

	hideConversionTable() {
		this.setState({ isConversionTableVisible: false });
	}

	readonly localStorageConfigKey = "bahasaPandaConfig";

	componentDidMount() {
		this.loadConfig();
	}

	loadConfig() {
		const savedConfig = localStorage.getItem(this.localStorageConfigKey);

		if (savedConfig) {
			try {
				this.setState({ ...JSON.parse(savedConfig) });
			} catch {
				localStorage.removeItem(this.localStorageConfigKey);
			}
		}
	}

	saveConfig() {
		const saveData = {
			hasSeenPanda: this.state.hasSeenPanda,
			isDarkMode: this.state.isDarkMode
		};

		localStorage.setItem(
			this.localStorageConfigKey,
			JSON.stringify(saveData)
		);
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
							this.state.isConversionTableVisible ?
								<ConversionTable
									toggleShowPanda={this.toggleShowPanda}
									backToStart={this.backToStart.bind(this)}
									hideConversionTable={this.hideConversionTable.bind(this)}

									shiftedTextArray={this.getShiftedTextArray(this.state.inputText)}
								/>
								:
								this.state.isConversionResultVisible ?
									<ConversionResult
										toggleShowPanda={this.toggleShowPanda}
										backToStart={this.backToStart.bind(this)}
										showConversionTable={this.showConversionTable.bind(this)}

										{...this.state}

										shift={Number(this.state.shift)}
										convertedText={this.state.convertedText}
									/>
									:
									<ConversionStart
										toggleShowPanda={this.toggleShowPanda}
										handleTextareaChange={this.handleTextareaChange.bind(this)}
										handleDecryptionChange={this.handleDecryptionChange.bind(this)}
										handleShiftChange={this.handleShiftChange.bind(this)}
										convertText={this.convertText.bind(this)}

										{...this.state}
									/>
						}
					</div>

					<Footer {...this.state} />

					<HowToUseModal
						hideHowToUse={this.hideHowToUse}
						{...this.state} />

				</div>
			</div>
		);
	}
}
