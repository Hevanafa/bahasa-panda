import React from "react";

interface IProps {
	toggleShowPanda: () => void;
	backToStart: () => void;
	showConversionTable: () => void;

	isDecryptionMode: boolean;

	inputText: string;
	shift: number;

	convertedText: string;
}

export default class ConversionResult extends React.Component<IProps> {
	render() {
		const {
			toggleShowPanda,
			backToStart,
			showConversionTable,

			isDecryptionMode,
			inputText,
			shift,
			convertedText
		} = this.props;

		return (
			<>
				<div className="drag-handler"
					onClick={toggleShowPanda} />

				<div className="input-group">
					<div className="label">Kalimat yang dimasukkan</div>
					<div className="textbox">
						{inputText}
					</div>
				</div>

				<div className="input-group">
					<div className="label">Hasil (Geser {shift}{isDecryptionMode ? " dekripsi" : ""})</div>
					<div className="textbox">
						{convertedText}
					</div>
				</div>

				<div className="flex-centre small-v-padding">
					<button className="btn-convert" onClick={backToStart}>
						Konversi lagi
					</button>
				</div>

				<div className="flex-centre small-v-padding">
					<button className="btn-convert" onClick={showConversionTable}>
						Lihat tabel konversi
					</button>
				</div>
			</>
		);
	}
}