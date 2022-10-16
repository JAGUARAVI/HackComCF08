import { useState, useMemo, useEffect } from 'react';
import { Text, Card, Grid, Input, Spacer, Button, Link as UILink, useInput } from '@nextui-org/react';
import {
	Navigate,
	Link,
} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import supabase from '../../supabase';

export default function SignIn({ session }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [message, setMessage] = useState(null);
	const [ready, setReady] = useState(false);

	const { reset, bindings } = useInput('');

	const validateEmail = (value) => {
		return value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i);
	};

	const emailHelper = useMemo(() => {
		if (!email) return { text: '', color: 'primary' };
		const isValid = validateEmail(email);
		return {
			text: isValid ? '' : 'Enter a valid email',
			color: isValid ? 'success' : 'error',
		};
	}, [email]);

	const signIn = async () => {
		supabase.auth.signIn({
			email, password
		}).then(({ error }) => {
			if (error) setMessage(error.message);
		}).catch((error) => {
			setMessage(error.message);
		});
	};

	useEffect(() => {
		if (validateEmail(email) && password) setReady(true);
		else setReady(false);

	}, [email, password]);

	return session ? (<Navigate to={'/'} replace={true} />) : (
		<div style={{
			background: 'linear-gradient(146.06deg, #4FBB5A 0%, #4CA2CD 143.3%)',
			minHeight: '100vh',
			height: '100%',
		}}>
			<Navbar session={session} />
			<Grid.Container gap={2} justify='center' alignItems='center' style={{
				height: '87%'
			}}>
				<Grid xs={10} sm={6} md={4} lg={4} xl={3}>
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
							<Text h2>Login</Text>
						</Card.Header>
						<Card.Body>
							{
								message ? (
									<>
										<Card isHoverable variant="bordered" css={{ border: '2px solid var(--nextui-colors-red700)', backgroundColor: 'var(--nextui-colors-red200)' }}>
											<Card.Body style={{
												display: 'inline-flex',
												justifyContent: 'center'
											}}>
												<Text color='var(--nextui-colors-red700)'>{message}</Text>
											</Card.Body>
										</Card>
										<Spacer y={2} />
									</>
								) : null
							}
							<Spacer y={0.5} />
							<Input
								{...bindings}
								clearable
								onClearClick={reset}
								color={emailHelper.color}
								helperColor={emailHelper.color}
								helperText={emailHelper.text}
								type='email'
								bordered
								labelPlaceholder='Email'
								onChange={(event) => setEmail(event.target.value)}
							/>
							<Spacer y={2} />
							<Input.Password
								bordered
								labelPlaceholder='Password'
								color='secondary'
								onChange={(event) => setPassword(event.target.value)}
							/>
							<Spacer y={1} />
							<Button disabled={!ready} ghost onPress={() => signIn()}>
								Submit
							</Button>
							<Spacer y={1} />
							<Text>
								Don't have an account? <UILink style={{ display: 'inline' }} as={Link} to='/signup'>Sign Up</UILink>								</Text>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</div>
	);
};