import React, { useState } from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import { theme, useAdminContext } from './adminContext';
import {
	Container,
	Sidenav,
	Nav,
	Header,
	Content,
	Sidebar,
	Navbar,
	Dropdown,
} from 'rsuite';
import { Icon } from '@rsuite/icons';
import LogoSvg from './components/svgComponents/LogoSvg';
import {
	AiOutlineHome,
	AiOutlineBlock,
	AiOutlineContacts,
} from 'react-icons/ai';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { BiHelpCircle } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';
import { VscSignOut } from 'react-icons/vsc';
import { GiGreenhouse } from 'react-icons/gi';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { GiFruitBowl } from 'react-icons/gi';
import { MdMyLocation } from 'react-icons/md';
import MainScreen from './screens/MainScreen';
import AboutScreen from './screens/AboutScreen';
import OthersScreen from './screens/OthersScreen';
import Products from './screens/Products';
import Locations from './screens/Locations';

const styles = {
	sidebar: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
	},
	sidebarHeader: {
		padding: theme.spacing(4.5),
		fontSize: theme.spacing(4.5),
		height: 56,
		background: '#34c3ff',
		color: ' #fff',
		overflow: 'hidden',
		alignItems: 'center',
		display: 'flex',
		flexWrap: 'wrap',
	},
	sidebarNav: {
		// width: '100%',
		// height: '100%',
	},
	main: {
		background: theme.colors.mainBg,
	},
	mainHeader: {
		paddingLeft: theme.spacing(4.5),
		fontSize: theme.spacing(4),
		height: 56,
		background: '#34c3ff',
		alignItems: 'center',
		display: 'flex',
		color: '#fff',
	},
	mainContent: {
		padding: theme.spacing(4.5),
	},
	mainContentContainer: {
		background: '#fff',
		padding: theme.spacing(4.5),
		fontSize: theme.spacing(4),
	},
	link: {
		color: '#fff',
	},
	span: {
		marginLeft: theme.spacing(3),
	},
	icon: {
		fontSize: theme.spacing(5),
		marginRight: theme.spacing(3),
	},
};

const AdminRouter = () => {
	const { navElements } = useAdminContext();

	const match = useRouteMatch();
	const [expandSidebar, setExpandSidebar] = useState(true);
	const [activeSideNavIndex, setActiveSideNavIndex] = useState(0);

	const RouterLink = React.forwardRef(({ to, children, ...rest }, ref) => (
		<Link ref={ref} to={to} {...rest}>
			{children}
		</Link>
	));
	return (
		<div className="screen main-router-screen">
			<Container>
				<Sidebar
					style={{
						...styles.sidebar,
					}}
					width={expandSidebar ? 240 : 56}
					collapsible
				>
					<Sidenav.Header>
						<Link to="/" target="_blank" style={styles.sidebarHeader}>
							<LogoSvg style={{ width: theme.spacing(5), transform: 'scale(1.5)' }} />
							{expandSidebar && (
								<span style={{ marginLeft: theme.spacing(4.25), fontWeight: '700' }}>
									{' '}
									Havvo Group
								</span>
							)}
						</Link>
					</Sidenav.Header>
					<Sidenav
						expanded={expandSidebar}
						style={{ height: '100%' }}
						appearance="inverse"
						defaultOpenKeys={['1']}
					>
						<Sidenav.Body>
							<Nav>
								<Dropdown
									eventKey="1"
									title="Контент блоков"
									icon={<Icon as={AiOutlineBlock} />}
								>
									<Dropdown.Item
										eventkey="1-1"
										icon={<Icon as={AiOutlineHome} />}
										as={RouterLink}
										to={match.path}
										active={activeSideNavIndex === 0}
										onClick={() => {
											setActiveSideNavIndex(0);
										}}
									>
										Начальный экран
									</Dropdown.Item>
									<Dropdown.Item
										eventkey="1-2"
										icon={<Icon as={AiOutlineContacts} />}
										to={`${match.path}/aboutscreen`}
										onClick={() => {
											setActiveSideNavIndex(1);
										}}
										as={RouterLink}
										active={activeSideNavIndex === 1}
									>
										Блок “о нас”
									</Dropdown.Item>
									<Dropdown.Item
										eventkey="1-3"
										icon={<Icon as={GiGreenhouse} />}
										to={`${match.path}/othersscreen`}
										onClick={() => {
											setActiveSideNavIndex(2);
										}}
										as={RouterLink}
										active={activeSideNavIndex === 2}
									>
										Остальные блоки
									</Dropdown.Item>
								</Dropdown>
								<Dropdown
									eventKey="2"
									title="Динамичный контент"
									icon={<Icon as={HiOutlineViewGridAdd} />}
								>
									<Dropdown.Item
										eventkey="2-1"
										icon={<Icon as={GiFruitBowl} />}
										as={RouterLink}
										to={`${match.path}/products`}
										active={activeSideNavIndex === 3}
										onClick={() => {
											setActiveSideNavIndex(3);
										}}
									>
										Продукция
									</Dropdown.Item>
									<Dropdown.Item
										eventkey="2-2"
										icon={<Icon as={MdMyLocation} />}
										as={RouterLink}
										to={`${match.path}/locations`}
										active={activeSideNavIndex === 4}
										onClick={() => {
											setActiveSideNavIndex(4);
										}}
									>
										Локации на карте
									</Dropdown.Item>
								</Dropdown>
							</Nav>
						</Sidenav.Body>
					</Sidenav>
					<NavToggle
						expand={expandSidebar}
						onChange={() => setExpandSidebar(!expandSidebar)}
					/>
				</Sidebar>

				<Container style={styles.main}>
					<Header style={styles.mainHeader}>
						<h4>{navElements[activeSideNavIndex]}</h4>
					</Header>
					<Content style={styles.mainContent}>
						<Container style={styles.mainContentContainer}>
							<Switch>
								<Route exact path={`${match.path}`} component={MainScreen} />
								<Route
									exact
									path={`${match.path}/aboutscreen`}
									component={AboutScreen}
								/>
								<Route
									exact
									path={`${match.path}/othersscreen`}
									component={OthersScreen}
								/>
								<Route exact path={`${match.path}/products`} component={Products} />
								<Route exact path={`${match.path}/locations`} component={Locations} />
							</Switch>
						</Container>
					</Content>
				</Container>
			</Container>
		</div>
	);
};

const NavItem = (props) => {
	return <Nav.Item {...props}>{props.children}</Nav.Item>;
};

const NavToggle = ({ expand, onChange }) => {
	return (
		<Navbar appearance="inverse" className="nav-toggle">
			<Nav>
				<Dropdown placement="topStart" trigger="click">
					<Dropdown.Item as="div" icon={<Icon as={BiHelpCircle} />}>
						Помощь
					</Dropdown.Item>
					<Dropdown.Item as="div" icon={<Icon as={BsGear} />}>
						Настройки
					</Dropdown.Item>

					<Dropdown.Item
						as="div"
						icon={<Icon as={VscSignOut} />}
						onClick={() => {
							localStorage.removeItem('authToken');
							window.location.reload();
						}}
					>
						Выход
					</Dropdown.Item>
				</Dropdown>
			</Nav>

			<Nav pullRight>
				<Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
					{expand ? <FaAngleLeft /> : <FaAngleRight />}
				</Nav.Item>
			</Nav>
		</Navbar>
	);
};

export default AdminRouter;
