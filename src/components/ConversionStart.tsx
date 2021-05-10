import React from "react";

interface IProps {
	toggleShowPanda: () => void;

	inputText: string;
	handleTextareaChange: (e: any) => void;

	isDecryptionMode: boolean;
	handleDecryptionChange: (e: any) => void;

	shift: string;
	handleShiftChange: (e: any) => void;

	convertText: () => void;
}
export default class ConversionStart extends React.Component<IProps> {
	render() {
		const {
			toggleShowPanda,

			inputText,
			handleTextareaChange,

			isDecryptionMode,
			handleDecryptionChange,

			shift,
			handleShiftChange,

			convertText
		} = this.props;
		
		return (
			<>
				<div className="drag-handler"
					onClick={toggleShowPanda} />

				<div className="input-group">
					<label htmlFor="input">Kalimat yang ingin diacak</label>
					<textarea
						id="input"
						placeholder="Masukkan teks"
						value={inputText}
						onChange={handleTextareaChange}></textarea>
				</div>

				<div className="input-group">
					<div>
						<div>
							<label htmlFor="shift">Geser Huruf</label>
						</div>

						<div className="right-group">
							<input id="decryption"
								type="checkbox"
								defaultChecked={isDecryptionMode}
								onChange={handleDecryptionChange}
							/>
							<label htmlFor="decryption">
								Dekripsi
							</label>
						</div>
					</div>
					<input type="number"
						id="shift"
						value={shift}
						onChange={handleShiftChange}
						pattern="\d+"
						min="0"
						max="25" />
				</div>

				<div className="flex-centre">
					<button className="btn-convert" onClick={convertText}>
						Konversi
					</button>
				</div>
			</>
		)
	}

}