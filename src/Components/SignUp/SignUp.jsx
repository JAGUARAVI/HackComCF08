import { useState, useMemo, useEffect } from 'react';
import { Text, useInput, Card, Grid, Input, Spacer, Button, Link as UILink } from '@nextui-org/react';
import {
	Navigate,
	Link,
} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import supabase from '../../supabase';

export default function SignIn({ session }) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [ready, setReady] = useState(false);

	const [done, setDone] = useState(false);
	const [message, setMessage] = useState(null);

	const { reset, bindings } = useInput('');

	const validateEmail = (value) => {
		return value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i);
	};

	const validatePassword = (value) => {
		return value.length >= 8;
	}

	const signUp = async () => {
		console.log(email, password, username)
		supabase.auth.signUp({ email, password }, { data: { username: username } }).then(({ error }) => {
			if (error) setMessage(error.message);
			else setDone(true);
		}).catch((error) => {
			setMessage(error.message);
		});
	};

	const emailHelper = useMemo(() => {
		if (!email) return { text: '', color: 'primary' };
		const isValid = validateEmail(email);
		return {
			text: isValid ? '' : 'Enter a valid email',
			color: isValid ? 'success' : 'error',
		};
	}, [email]);

	const passwordHelper = useMemo(() => {
		if (!password) return { text: '', color: 'primary' };
		const isValid = validatePassword(password);
		return {
			text: isValid ? '' : 'Password should have atleast 8 letters',
			color: isValid ? 'success' : 'error',
		};
	}, [password]);

	useEffect(() => {
		if (username && validateEmail(email) && password) setReady(true);
		else setReady(false);

	}, [username, email, password]);

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
					<Card variant="bordered" style={{
						padding: '1rem',
						background: 'rgba(255, 255, 255, 0.7)',
						border: '1px solid rgba(255, 255, 255, 0.5)',
						backdropFilter: 'blur(20px)'
					}}>
						<Card.Header style={{
							display: 'inline-flex',
							justifyContent: 'center'
						}}>
							<Text h2>Welcome Back!</Text>
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
							{
								done ? (
									<>
										<Card isHoverable variant="bordered" css={{ border: '2px solid var(--nextui-colors-green700)', backgroundColor: 'var(--nextui-colors-green200)' }}>
											<Card.Body style={{
												display: 'inline-flex',
												justifyContent: 'center'
											}}>
												<Text color='var(--nextui-colors-green700)'>Successfully Signed Up. Please check your email for a confirmation.</Text>
											</Card.Body>
										</Card>
										<Spacer y={2} />
									</>
								) : null
							}
							<Spacer y={0.5} />
							<Input
								bordered
								labelPlaceholder='Name'
								color='success'
								onChange={(event) => setUsername(event.target.value)}
							/>
							<Spacer y={2} />
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
								{...bindings}
								clearable
								onClearClick={reset}
								color={passwordHelper.color}
								helperColor={passwordHelper.color}
								helperText={passwordHelper.text}
								bordered
								labelPlaceholder='Password'
								onChange={(event) => setPassword(event.target.value)}
							/>
							<Spacer y={2} />
							<Button disabled={!ready} ghost onPress={() => signUp()}>
								Submit
							</Button>
							<Spacer y={1} />
							<Text>
								Already have an account? <UILink style={{ display: 'inline' }} as={Link} to='/signin'>Sign In</UILink>					</Text>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</div>
	);
};