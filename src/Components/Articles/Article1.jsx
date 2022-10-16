import { Text, Link, Collapse, Grid, Card } from '@nextui-org/react';
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
						background: 'rgba(255, 255, 255, 0.7)',
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
							<Collapse.Group>
								<Collapse title="Anxiety Disorders">
									<Text>
										Anxiety disorders is a group of mental health disorders that includes generalised anxiety disorders, social phobias, specific phobias (for example, agoraphobia and claustrophobia), panic disorders, obsessive compulsive disorder (OCD) and post-traumatic stress disorder. Untreated, anxiety disorders can lead to significant impairment on people’s daily lives.
									</Text>
								</Collapse>
								<Collapse title="Behavioural and Emotional Disorders in Children">
									<Text>
										Common behaviour disorders in children include oppositional defiant disorder (ODD), conduct disorder (CD) and attention deficit hyperactivity disorder (ADHD). Treatment for these mental health disorders can include therapy, education and medication.
									</Text>
								</Collapse>
								<Collapse title="Bipolar Affective Disorder">
									<Text>
										Bipolar affective disorder is a type of mood disorder, previously referred to as ‘manic depression’. A person with bipolar disorder experiences episodes of mania (elation) and depression. The person may or may not experience psychotic symptoms. The exact cause is unknown, but a genetic predisposition has been clearly established. Environmental stressors can also trigger episodes of this mental illness.
									</Text>
								</Collapse>
								<Collapse title="Depression">
									<Text>
										Depression is a mood disorder characterised by lowering of mood, loss of interest and enjoyment, and reduced energy. It is not just feeling sad. There are different types and symptoms of depression. There are varying levels of severity and symptoms related to depression. Symptoms of depression can lead to increased risk of suicidal thoughts or behaviours.
									</Text>
								</Collapse>
								<Collapse title="Obsessive Compulsive Disorder">
									<Text>
										Obsessive compulsive disorder (OCD) is an anxiety disorder. Obsessions are recurrent thoughts, images or impulses that are intrusive and unwanted. Compulsions are time-consuming and distressing repetitive rituals. Treatments include cognitive behaviour therapy (CBT), and medications.
									</Text>
								</Collapse>
								<Collapse title="Paranoia">
									<Text>
										Paranoia is the irrational and persistent feeling that people are ‘out to get you’. Paranoia may be a symptom of conditions including paranoid personality disorder, delusional (paranoid) disorder and schizophrenia. Treatment for paranoia include medications and psychological support.
									</Text>
								</Collapse>
								<Collapse title="Post-Traumatic Stress Disorder">
									<Text>
										Post-traumatic stress disorder (PTSD) is a mental health condition that can develop as a response to people who have experienced any traumatic event. This can be a car or other serious accident, physical or sexual assault, war-related events or torture, or natural disasters such as bushfires or floods.
									</Text>
								</Collapse>
							</Collapse.Group>
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