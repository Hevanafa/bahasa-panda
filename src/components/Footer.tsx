import React from "react";

interface IProps {
	blurBody: boolean;
	isPandaVisible: boolean;
}
export default class Footer extends React.Component<IProps> {
	render() {
		const { blurBody, isPandaVisible } = this.props;

		return (
			<div className={
				"footer" +
				(blurBody ? " blurred" : "") +
				(isPandaVisible ? " hidden" : "")
			}>
				Graphics Design: T3CH_Kitsu<br />
				Programming: Hevanafa<br />
				Panda by Hevanafa<br />
				May 2021, T3CH_Kitsu &amp; Hevanafa
			</div>
		);
	}
}