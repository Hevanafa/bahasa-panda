import React from "react";

interface IProps {
	hideHowToUse: () => void;
	showHowToUse: boolean;
}

export default class HowToUseModal extends React.Component<IProps> {
	render() {
		return (
			<>
				{
					this.props.showHowToUse ?
					<div className="how-to-use-overlay"
						onClick={this.props.hideHowToUse} /> : null
				}

				<div className={"how-to-use-modal" + (this.props.showHowToUse ? " visible" : "")}>
					<h1>Cara Menggunakan Aplikasi</h1>
					<div className="textbox">
						<p>
							Masukkan teks, lalu tulis bilangan yang akan "menggeser" masing-masing huruf dari teks input.
						</p>

						<p>
							<strong>Contoh:</strong><br />
							Input teks: <code>abc</code><br />
							Geser: <code>3</code><br />
							Maka hasilnya adalah: <code>def</code>
						</p>

						<p>
							<strong>Cara kerjanya:</strong><br />
							<strong>a</strong> ➡ b ➡ c ➡ d<br />
							<strong>b</strong> ➡ c ➡ d ➡ e<br />
							<strong>c</strong> ➡ d ➡ e ➡ f
						</p>

						<p>
							<strong>Format input:</strong><br />
							Input teks: teks biasa (string)<br />
							Geser: bilangan (-25 sampai 25, inklusif)
						</p>

						<p>
							Geser (bilangan positif):<br />
							geser huruf dari <code>a</code> ke <code>z</code><br />
							Geser (bilangan negatif):<br />
							geser huruf dari <code>z</code> ke <code>a</code>
						</p>

						<p>
							Untuk informasi lebih lanjut, baca:<br />
							<a href="https://id.wikipedia.org/wiki/Sandi_Caesar" rel="noreferrer" target="_blank">Sandi Caesar (Wikipedia)</a>.
			</p>
					</div>
				</div>
			</>
		);
	}
}