import { Text, Link, Collapse, Grid, Card, Spacer } from '@nextui-org/react';
import Navbar from '../Navbar/Navbar';

export default function Article({ session }) {
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
				<Grid xs={12} sm={10} md={8} lg={8} xl={6}>
					<Card style={{
						padding: '1rem',
						background: 'rgba (255,255,255,0.8)',
						border: '1px solid rgba(255, 255, 255, 0.5)',
						backdropFilter: 'blur(20px)'
					}}>
						<Card.Header style={{
							display: 'inline-flex',
							justifyContent: 'center'
						}}>
							<Text size={30}>Different Mental Ilnesses and Symptoms</Text>
						</Card.Header>
						<Card.Body>
							<Text size={20}>
								Mental health is not a destination, but a process.
								It's about how you drive, not where you're going.
							</Text>
							<Spacer y={1} />
							<Text size={20}>
								Mental health is a topic that can be quite difficult to understand. It's a very broad term, encompassing many different aspects of our lives. From the moment we're born, to our social interactions, and even the events that affect us on a daily basis, issues with mental health happen. That's why it's important to take your mental health seriously because what affects you now can affect your future outlook and mental state.
							</Text>
							<Spacer y={1} />
							<Text size={20}>
								Mental health is something we all need to pay attention to. It's important that we don't just treat the symptoms but also understand what causes them, in order to be able to help.
							</Text>
							<Spacer y={1} />
							<Text size={20}>
								Mental health is an important topic to discuss. Not only do one in four people experience mental health problems but also because it's effects can be seen in most sectors of society, including the workplace.
							</Text>
							<Spacer y={1} />
							<Text size={20}>
								Mental and physical health is fundamentally linked. There are multiple associations between mental health and chronic physical conditions that significantly impact people’s quality of life, demands on health care and other publicly funded services, and generate consequences to society.  The World Health Organization (WHO) defines: health as a state of complete physical, mental and social well-being and not merely the absence of disease or infirmity.   The WHO states that “there is no health without mental health.”
							</Text>
							<Spacer y={1} />
							<Link isExternal block color="primary" href="https://www.betterhealth.vic.gov.au/" target='_blank'>
								Source
							</Link>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</div >
	);
}