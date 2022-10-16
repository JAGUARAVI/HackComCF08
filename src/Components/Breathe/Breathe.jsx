import { useState, useEffect, useRef } from 'react';
import { Text, Container, Grid, Card, Button, Spacer } from '@nextui-org/react';
import Navbar from '../Navbar/Navbar';
import Lottie from 'lottie-react';
import BreatheData from '../../Assets/Breathe.json';
import Timer from '../Timer/Timer';

export default function Breathe({ session }) {
	const messages = ['Inhale', 'Exhale'];

	const [tick, setTick] = useState(0);
	const [started, setStarted] = useState(false);
	const [breathe, setBreathe] = useState(messages[0]);

	const lottieRef = useRef();

	useEffect(() => {
		lottieRef.current?.setSpeed(0.6);
	}, [])

	useEffect(() => {
		if (started) lottieRef.current?.goToAndPlay(180, true);
		else lottieRef.current?.pause();
	}, [started])

	useEffect(() => {
		const interval = setInterval(() => {
			setBreathe(messages[tick % 2]);
			if (started) {
				setTick((currentTick) => {
					if (currentTick >= 12) {
						setTick(0);
						setStarted(false);
						clearInterval(interval);
					}
					setBreathe(messages[(currentTick + 1) % 2]);
					return currentTick + 1;
				});
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [started]);

	return (
		<div style={{
			minHeight: '100vh',
			height: '100%',
			width: '100vw',
			background: 'linear-gradient(146.06deg, #4FBB5A 0%, #4CA2CD 143.3%)',
		}}>
			<Navbar session={session} />
			<Grid.Container gap={2} justify='center' alignItems='center' style={{
				height: '87%'
			}}>
				<Grid xs={12} sm={10} md={8} lg={8} xl={8}>
					<Card style={{
						width: '100%',
						backgroundColor: 'rgba(255,255,255,1)'
					}}>
						<Card.Header style={{
							display: 'inline-flex',
							justifyContent: 'center'
						}}>
							<Text h1 style={{
								background: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',
								'-webkit-background-clip': 'text',
								'-webkit-text-fill-color': 'transparent',
							}}>{started ? breathe : 'Breathe (1 Minute)'}</Text>
						</Card.Header>
						<Card.Body style={{
							transition: 'all 1s ease-in-out'
						}}>
							<div style={{
								display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%',
								marginBottom: '-5rem', zIndex: 1
							}}>
								{
									started ?
										<>
											<Text h4 style={{ textAlign: 'center' }}>{Math.floor(tick / 2)} / 6<Timer /></Text>
										</> : <div>
											<Spacer y={4} />
											<Button onPress={() => setStarted(true)}>
												Start
											</Button>
										</div>
								}
							</div>
							<div style={{
								display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%',
								transition: 'all 1s ease-in-out'
							}}>
								<Lottie animationData={BreatheData} loop={true} style={{ width: '30rem' }}
									autoplay={true} lottieRef={lottieRef} />
							</div>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</div>
	);
}