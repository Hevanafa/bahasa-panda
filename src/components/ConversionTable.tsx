import React from "react";

interface IProps {
	toggleShowPanda: () => void;
	backToStart: () => void;
	hideConversionTable: () => void;

	shiftedTextArray: string[];
}

export default class ConversionTable extends React.Component<IProps> {
	render() {
		const {
			toggleShowPanda,
			backToStart,
			hideConversionTable,
			shiftedTextArray
		} = this.props;

		return (
			<>
				<div className="drag-handler"
					onClick={toggleShowPanda} />

				<div className="shift-grid">
					<div className="header">
						<div>Geser</div>
						<div>Prediksi Kalimat</div>
					</div>

					<div className="scrollable-body">
						{
							shiftedTextArray.map((text, idx) =>
								<div key={`${idx}`}>
									<div>{idx}</div>
									<div>{text}</div>
								</div>
							)
						}
					</div>
				</div>

				<div className="flex-centre small-v-padding">
					<button className="btn-convert"
						onClick={backToStart}>
						Konversi lagi
					</button>
				</div>
				<div className="flex-centre small-v-padding">
					<button className="btn-convert"
						onClick={hideConversionTable}>
						Lihat hasil konversi
					</button>
				</div>
			</>
		);
	}

}