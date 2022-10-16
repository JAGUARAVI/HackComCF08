import { useState, useRef, useEffect } from 'react';
import { Grid, Card, Text, Button, Modal, Input, Radio, Spacer, Textarea, useInput } from '@nextui-org/react';
import Navbar from '../Navbar/Navbar';
import {
	Navigate,
	Link,
} from 'react-router-dom';
import 'chart.js/auto';
import {
	Chart
} from 'react-chartjs-2';
import supabase from '../../supabase';

export default function Dashboard({ session }) {
	const [data, setData] = useState({
		labels: new Array(Math.min(supabase.auth.user().user_metadata.records?.length || 0, 20)).fill(''),
		datasets: [
			{
				id: 1,
				label: 'Mental Health',
				data: supabase.auth.user().user_metadata.records?.slice(0, 20) || [],
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	});

	console.log(data);

	const chartRef = useRef();

	useEffect(() => {
		chartRef.current.config.data = data;
	}, [data])

	const [normal, setNormal] = useState(false);
	const [AI, setAI] = useState(false);

	const [answersAI, setAnswersAI] = useState({ one: '', two: '', three: '', four: '', five: '', });
	const [answersNormal, setAnswersNormal] = useState({ one: '', two: '', three: '', four: '', five: '', });

	const getResult = async (text) => {
		return parseFloat(await fetch(`https://sentimentanalysis.jaguaravi.repl.co/?text=${encodeURIComponent(text)}`, {
			method: 'GET'
		}).then((res) => res.json()).then((res) => res.negative), 10);
	}

	const SentimentAnalysis = async () => {
		const res = await Promise.all(Object.keys(answersAI).map((key) => getResult(answersAI[key])));
		const result = Math.round((1 - res.reduce((a, b) => a + b, 0) / res.length) * 1000) / 10;

		const metadata = supabase.auth.user().user_metadata;
		const records = metadata.records?.slice(0, 20) || [];

		records.push(result);
		data.labels = new Array(Math.min(records.length, 20)).fill('')
		data.datasets[0].data = records;
		setData(data);

		await supabase.auth.update({ data: { records } });

		setAnswersAI({ one: '', two: '', three: '', four: '', five: '', });
		setAI(false);
	}

	const NormalAnalysis = () => {
		//const result = Math.round((1 - (Object.keys(answersNormal).map((key) => parseFloat(answersNormal[key] || '0')).reduce((a, b) => a + b, 0)) / answersNormal.length) * 1000) / 10;
		const vals = Object.keys(answersNormal).map((key) => parseFloat(answersNormal[key] || '0'));
		const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
		console.log(vals, avg)
		const result = Math.round((1 - avg) * 1000) / 10;

		const metadata = supabase.auth.user().user_metadata;
		const records = metadata.records?.slice(0, 20) || [];

		records.push(result);
		data.labels = new Array(Math.min(records.length, 20)).fill('')
		data.datasets[0].data = records;
		setData(data);
		
		setAnswersNormal({ one: '', two: '', three: '', four: '', five: '', });

		supabase.auth.update({ data: { records } }).then(() => setNormal(false) || setAnswersAI({ one: '', two: '', three: '', four: '', five: '', }));
	};

	return !session ? <Navigate to='/signin' /> : (
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
				<Grid xs={12} lg={9}>
					<Card style={{
						backgroundColor: 'rgba(255,255,255,1)'
					}}>
						<Card.Header style={{
							display: 'inline-flex',
							justifyContent: 'center'
						}}>
							<Text style={{
								fontSize: '2rem'
							}}>Dashboard</Text>
						</Card.Header>
						<Card.Body>
							<Grid.Container gap={2}>
								<Grid xs={12}>
									<Chart ref={chartRef} type='line' data={data} />
								</Grid>
								<Grid xs={6}>
									<Button color="primary" onPress={() => setNormal(true)}>Take Short Assestment</Button>
									<Modal
										closeButton
										aria-labelledby="modal-title"
										open={normal}
										onClose={() => setNormal(false)}
										scroll
										width='80vw'
									>
										<Modal.Header>
											<Text id="modal-title" size={30}>
												Answer The Following Questions
											</Text>
										</Modal.Header>
										<Modal.Body>
											<form>
												<Text id="modal-title" size={25}>
													Do you often have problems remembering appointments or obligations ?
												</Text>
												<Radio.Group color="secondary" onChange={(val) => {
													answersNormal.one = val;
													setAnswersNormal(answersNormal);
												}} defaultValue="0">
													<Radio value="0.9">Yes</Radio>
													<Radio value="0">No</Radio>
												</Radio.Group>
												<Spacer y={1} />
												<Text id="modal-title" size={25}>
													To keep yourself satisfied, are you increasing the time you spend on the internet?
												</Text>
												<Radio.Group color="secondary" onChange={(val) => {
													answersNormal.two = val;
													setAnswersNormal(answersNormal);
												}} defaultValue="0">
													<Radio value="0.05">Rarely</Radio>
													<Radio value="0.1">Occasionally</Radio>
													<Radio value="0">Not Applicable</Radio>
													<Radio value="0.6">Often</Radio>
													<Radio value="0.8">Always</Radio>
												</Radio.Group>
												<Spacer y={1} />
												<Text id="modal-title" size={25}>
													Do you feel uneasy while having smaill discussions ?
												</Text>
												<Radio.Group color="secondary" onChange={(val) => {
													answersNormal.three = val;
													setAnswersNormal(answersNormal);
												}} defaultValue="0">
													<Radio value="0.85">Yes</Radio>
													<Radio value="0">No</Radio>
												</Radio.Group>
												<Spacer y={1} />
												<Text id="modal-title" size={25}>
													Do you often get irritated by small inconveniences or when things don't go according to planned ?
												</Text>
												<Radio.Group color="secondary" onChange={(val) => {
													answersNormal.four = val;
													setAnswersNormal(answersNormal);
												}} defaultValue="0">
													<Radio value="0.9">Yes</Radio>
													<Radio value="0">No</Radio>
												</Radio.Group>
												<Spacer y={1} />
												<Text id="modal-title" size={25}>
													You are very sensitive towards your faliures or disappointments.
												</Text>
												<Radio.Group color="secondary" onChange={(val) => {
													answersNormal.five = val;
													setAnswersNormal(answersNormal);
												}} defaultValue="0">
													<Radio value="1">Yes</Radio>
													<Radio value="0">No</Radio>
												</Radio.Group>
												<Spacer y={1} />
											</form>
										</Modal.Body>
										<Modal.Footer>
											<Button auto flat color="error" onPress={() => setNormal(false)}>
												Close
											</Button>
											<Button color="success" auto onPress={() => NormalAnalysis()}>
												Submit
											</Button>
										</Modal.Footer>
									</Modal>
								</Grid>
								<Grid xs={6}>
									<Button color="success" onPress={() => setAI(true)}>Take Long Assestment</Button>
									<Modal
										closeButton
										aria-labelledby="modal-title"
										open={AI}
										onClose={() => setAI(false)}
										scroll
										width='80vw'
									>
										<Modal.Header>
											<Text id="modal-title" size={30}>
												Answer The Following Questions
											</Text>
										</Modal.Header>
										<Modal.Body>
											<Spacer y={1} />
											<Textarea
												onChange={(event) => {
													answersAI.one = event.target.value;
													setAnswersAI(answersAI);
												}}
												underlined
												color="secondary"
												labelPlaceholder="How are you feeling today? Do you have any problems which distress you?"
											/>
											<Spacer y={2} />
											<Textarea
												onChange={(event) => {
													answersAI.two = event.target.value;
													setAnswersAI(answersAI);
												}}
												underlined
												color="secondary"
												labelPlaceholder="Do you feel at ease / comfortable with yourself and your surroundings?"
											/>
											<Spacer y={2} />
											<Textarea
												onChange={(event) => {
													answersAI.three = event.target.value;
													setAnswersAI(answersAI);
												}}
												underlined
												color="secondary"
												labelPlaceholder="Do you ever feel like you need someone to talk to, but don’t know who to talk to?"
											/>
											<Spacer y={2} />
											<Textarea
												onChange={(event) => {
													answersAI.four = event.target.value;
													setAnswersAI(answersAI);
												}}
												underlined
												color="secondary"
												labelPlaceholder="How often have you been bothered by trouble falling or staying asleep, or sleeping too much?"
											/>
											<Spacer y={2} />
											<Textarea
												onChange={(event) => {
													answersAI.five = event.target.value;
													setAnswersAI(answersAI);
												}}
												underlined
												color="secondary"
												labelPlaceholder="How frequently have the things that usually bring you pleasure stopped doing so recently?"
											/>
											<Spacer y={1} />
										</Modal.Body>
										<Modal.Footer>
											<Button auto flat color="error" onPress={() => setAI(false)}>
												Close
											</Button>
											<Button color="success" auto onPress={() => SentimentAnalysis()} >
												Submit
											</Button>
										</Modal.Footer>
									</Modal>
								</Grid>
							</Grid.Container>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</div >
	);
}