import { Navbar as NextNavbar, Text, Button, Dropdown, Avatar, Link as NextLink } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import supabase from '../../supabase';

export default function Navbar({ session }) {
	return (
		<NextNavbar isBordered variant='floating' style={{
			background: 'transparent'
		}}>
			<NextNavbar.Brand>
				<NextNavbar.Toggle showIn='sm' aria-label="toggle navigation" />
				<Text b size={30} as={Link} to={'/'}>
					Pacify
				</Text>
			</NextNavbar.Brand>
			<NextNavbar.Collapse variant='underline' showIn='sm'>
				<NextNavbar.CollapseItem><NextLink style={{ minWidth: '100%' }} as={Link} to='/breathe' href='/breathe'>Breathe</NextLink></NextNavbar.CollapseItem>
				<Dropdown isBordered>
					<NextNavbar.CollapseItem>
						<Dropdown.Button
							auto
							light
							css={{
								px: 0,
								dflex: "center",
								svg: { pe: "none" },
							}}
							ripple={false}
						>
							Read About Mental Health
						</Dropdown.Button>
					</NextNavbar.CollapseItem>
					<Dropdown.Menu
						aria-label="Mental Illnesses"
						css={{
							$$dropdownMenuWidth: "340px",
							$$dropdownItemHeight: "70px",
							"& .nextui-dropdown-item": {
								py: "$4",
								// dropdown item left icon
								svg: {
									color: "$secondary",
									mr: "$4",
								},
								// dropdown item title
								"& .nextui-dropdown-item-content": {
									w: "100%",
									fontWeight: "$semibold",
								},
							},
						}}
					>
						<Dropdown.Item
							showFullDescription
							description="Discover about mental illnesses"
						>
							<NextLink as={Link} to='/article/1' href='/article/1'>
								Discover
							</NextLink>
							<Link href='/article/1'>Discover</Link>
						</Dropdown.Item>
						<Dropdown.Item
							showFullDescription
							description="Find out if you're facing any problem."
						>
							<NextLink as={Link} to='/article/2'>
								Find
							</NextLink>
						</Dropdown.Item>
						<Dropdown.Item
							showFullDescription
							description="Find solutions to your mental problems!"
						>
							<NextLink as={Link} to='/article/3'>
								Cure
							</NextLink>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<NextNavbar.CollapseItem><NextLink style={{ minWidth: '100%' }} as={Link} to='/dashboard' href='/breathe'>Dashboard</NextLink></NextNavbar.CollapseItem>
			</NextNavbar.Collapse>
			<NextNavbar.Content hideIn='sm'>
				<NextNavbar.Link style={{ minWidth: '100%' }} as={Link} to='/breathe' href='/breathe'>Breathe</NextNavbar.Link>
				<Dropdown isBordered>
					<NextNavbar.Item>
						<Dropdown.Button
							auto
							light
							css={{
								px: 0,
								dflex: "center",
								svg: { pe: "none" },
							}}
							//iconRight={icons.chevron}
							ripple={false}
						>
							Read About Mental Health
						</Dropdown.Button>
					</NextNavbar.Item>
					<Dropdown.Menu
						aria-label="Mental Illnesses"
						css={{
							$$dropdownMenuWidth: "340px",
							$$dropdownItemHeight: "70px",
							"& .nextui-dropdown-item": {
								py: "$4",
								// dropdown item left icon
								svg: {
									color: "$secondary",
									mr: "$4",
								},
								// dropdown item title
								"& .nextui-dropdown-item-content": {
									w: "100%",
									fontWeight: "$semibold",
								},
							},
						}}
					>
						<Dropdown.Item
							showFullDescription
							description="Discover about mental illnesses"
						>
							<NextLink as={Link} to='/article/1'>
								Discover
							</NextLink>
						</Dropdown.Item>
						<Dropdown.Item
							showFullDescription
							description="Find out if you're facing any problem."
						>
							<NextLink as={Link} to='/article/2'>
								Find
							</NextLink>
						</Dropdown.Item>
						<Dropdown.Item
							showFullDescription
							description="Find solutions to your mental problems!"
						>
							<NextLink as={Link} to='/article/3'>
								Cure
							</NextLink>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<NextNavbar.Link style={{ minWidth: '100%' }} as={Link} to='/dashboard' href='/breathe'>Dashboard</NextNavbar.Link>
			</NextNavbar.Content>
			<NextNavbar.Content>
				{session ? (
					<>
						<Dropdown placement="bottom-right">
							<NextNavbar.Item>
								<Dropdown.Trigger>
									<Avatar
										bordered
										as="div"
										color="success"
										size="md"
										src={
											`https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.user_metadata.username)}&rounded=true&background=random&size=128`
										}
									/>
								</Dropdown.Trigger>
							</NextNavbar.Item>
							<Dropdown.Menu
								aria-label="User menu actions"
								color="secondary"
								onAction={(actionKey) => {
									if (actionKey === 'logout') {
										supabase.auth.signOut().then(() => {

										});
									}
								}}
							>
								<Dropdown.Item key="profile" css={{ height: "$18" }}>
									<Text b color="inherit" css={{ d: "flex" }}>
										Signed in as
									</Text>
									<Text b color="inherit" css={{ d: "flex" }}>
										{
											session.user.email
										}
									</Text>
								</Dropdown.Item>
								<Dropdown.Item key="logout" withDivider color="error">
									Log Out
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</>
				) : (
					<>
						<NextNavbar.Link as={Link} color='inherit' to='/signin'>
							Sign In
						</NextNavbar.Link>
						<NextNavbar.Item>
							<Button auto flat as={Link} to='/signup'>
								Sign Up
							</Button>
						</NextNavbar.Item>
					</>
				)}
			</NextNavbar.Content>
		</NextNavbar >
	);
};