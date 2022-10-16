import './Timer.css';

export default function Timer() {
	return (
		<div className="countdown">
			<svg viewBox="-50 -50 100 100" strokeWidth={10}>
				<circle r={45} />
				<circle
					r={45}
					strokeDasharray="282.7433388230814"
					strokeDashoffset="282.7433388230814px"
				/>
			</svg>
		</div>
	);
}