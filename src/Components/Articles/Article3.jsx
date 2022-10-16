import { Text, Collapse, Grid, Card, Spacer, Link as NextLink } from '@nextui-org/react';
import Navbar from '../Navbar/Navbar';
import {
	Navigate,
	Link,
} from 'react-router-dom';

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
							<Text size={30}>Solution to Mental Health Issues</Text>
						</Card.Header>
						<Card.Body>
							<Collapse.Group>
								<Collapse title="What Goes Around Comes Around">
									<Text b>
										Research suggests that acts of giving and kindness can help improve your mental wellbeing by -
									</Text>
									<ul>
										<li>Creating positive feelings and a sense of reward.
										</li>
										<li>Giving you a feeling of purpose and self-worth.
										</li>
										<li>Helping you connect with other people.</li>
									</ul>
									<Spacer y={1} />
									<Text b>
										It could be small acts of kindness towards other people, or larger ones like volunteering in your local community.
									</Text>
									<Spacer y={0.5} />
									<Text b>
										Some examples of the things you could try include -
									</Text>
									<ul>
										<li>Saying "thank you" to someone for something they have done for you

										</li>
										<li>Asking friends, family or colleagues how they are and really listening to their answer

										</li>
										<li>Spending time with friends or relatives who need support or company.
										</li>
										<li>Offering someone help.
										</li>
										<li>Volunteering in your community, such as helping at a school, hospital or care home.</li>
									</ul>
								</Collapse>
								<Collapse title="Connect With Other People">
									<Text b>
										Good relationships are important for your mental wellbeing. They can -
									</Text>
									<ul>
										<li>Help you to build a sense of belonging and self-worth.

										</li>
										<li>Give you an opportunity to share positive experiences.
										</li>
										<li>Provide you emotional support and allow you to support others.
										</li>
									</ul>
								</Collapse>
								<Collapse title="Try Our Self-Assessment Test Tool">
									<Text b>
										You can use our Mental Health Tracker to track your mental health.
									</Text>
									<NextLink color='primary' as={Link} to='/dashboard'>
										Navigate to Dashboard
									</NextLink>
								</Collapse>
							</Collapse.Group>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</div >
	);
}