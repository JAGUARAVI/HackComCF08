import { useState, useEffect } from 'react';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import Home from './Components/Home/Home';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import Dashboard from './Components/Dashboard/Dashboard';
import Breathe from './Components/Breathe/Breathe';

import Article1 from './Components/Articles/Article1';
import Article2 from './Components/Articles/Article2';
import Article3 from './Components/Articles/Article3';

import supabase from './supabase';

import {
	BrowserRouter as Router,
	Route,
	Routes
} from 'react-router-dom';

import './App.css';

const theme = createTheme({
	type: 'light',
	colors: {
		secondary: '#03fc98'
	}
});

export default function App() {
	const [session, setSession] = useState(supabase.auth.session());

	useEffect(() => {
		supabase.auth.onAuthStateChange((_event, newSession) => setSession(newSession));
	}, []);

	return (
		<NextUIProvider theme={theme}>
			<Router>
				<Routes>
					<Route path='/' element={
						<Home session={session} />
					} />
					<Route path='/dashboard' element={
						<Dashboard session={session} />
					} />
					<Route path='/breathe' element={
						<Breathe session={session} />
					} />
					<Route path='/article/1' element={
						<Article1 session={session} />
					} />
					<Route path='/article/2' element={
						<Article2 session={session} />
					} />
					<Route path='/article/3' element={
						<Article3 session={session} />
					} />
					<Route path='/signin' element={
						<SignIn session={session} />
					} />
					<Route path='/signup' element={
						<SignUp session={session} />
					} />
					<Route path='*' element={
						<>Not Found</>
					} />
				</Routes>
			</Router>
		</NextUIProvider>
	);
};