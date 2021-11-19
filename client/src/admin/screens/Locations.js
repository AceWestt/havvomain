import React, { useEffect, useState } from 'react';
import {
	Button,
	Message,
	Panel,
	List,
	FlexboxGrid,
	ButtonToolbar,
	IconButton,
	toaster,
} from 'rsuite';
import { Icon } from '@rsuite/icons';
import AddContinent from '../components/continentScreenSub/drawers/AddContinent';
import EditContinent from '../components/continentScreenSub/drawers/EditContinent';
import AddLocation from '../components/continentScreenSub/drawers/AddLocation';
import { useAxiosGet } from '../../common/hooks/useAxiosGet';
import { theme } from '../adminContext';
import { TiEdit } from 'react-icons/ti';
import { MdDeleteForever } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import axios from 'axios';
import EditLocation from '../components/continentScreenSub/drawers/EditLocations';

const styles = {
	root: {
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
	},
	continentList: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		gap: theme.spacing(5),
		marginTop: theme.spacing(10),
	},
	continentCard: {
		width: theme.spacing(75),
	},
};

const Locations = () => {
	const { data: continents, fetchData } = useAxiosGet(
		'/api/locations/continents'
	);

	const [isAddingContinent, setIsAddingContinent] = useState(false);

	const [isEditingContinent, setIsEditingContinent] = useState(false);
	const [editedContinent, setEditedContinent] = useState(null);

	const [isAddingLocation, setIsAddingLocation] = useState(false);
	const [addedToContId, setAddedToContId] = useState(null);
	const [locations, setLocations] = useState([]);

	const [isEditingLocation, setIsEditingLocation] = useState(false);
	const [editedLocation, setEditedLocation] = useState(null);

	const { data: locationsData, fetchData: fetchLocations } = useAxiosGet(
		'/api/locations/locations'
	);

	useEffect(() => {
		setLocations(locationsData);
	}, [locationsData]);

	const deleteContinent = async (id) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};

		try {
			const { data } = await axios.delete(
				`/api/locations/continents/${id}`,
				config
			);
			if (data.status === 'success') {
				toaster.push(successMessage('Удалено!'), {
					placement: messagePlacement,
				});
				fetchData();
			} else {
				toaster.push(errorMessage('Ошибка!'), {
					placement: messagePlacement,
				});
			}
		} catch (error) {
			if (error.response?.data.error) {
				toaster.push(errorMessage(error.response.data.error), {
					placement: messagePlacement,
				});
			} else {
				toaster.push(errorMessage('Ошибка!'), {
					placement: messagePlacement,
				});
			}
		}
	};

	const deleteLocation = async (id) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		};

		try {
			const { data } = await axios.delete(
				`/api/locations/locations/${id}`,
				config
			);
			if (data.status === 'success') {
				toaster.push(successMessage('Удалено!'), {
					placement: messagePlacement,
				});
				fetchLocations();
			} else {
				toaster.push(errorMessage('Ошибка!'), {
					placement: messagePlacement,
				});
			}
		} catch (error) {
			if (error.response?.data.error) {
				toaster.push(errorMessage(error.response.data.error), {
					placement: messagePlacement,
				});
			} else {
				toaster.push(errorMessage('Ошибка!'), {
					placement: messagePlacement,
				});
			}
		}
	};

	const errorMessage = (error) => {
		return (
			<Message showIcon type="error">
				{error}
			</Message>
		);
	};

	const successMessage = (msg) => {
		return (
			<Message showIcon type="success" duration={5000}>
				{msg}
			</Message>
		);
	};
	const messagePlacement = 'topCenter';
	return (
		<div style={styles.root}>
			<h2>
				Континенты{' '}
				<Button
					appearance="subtle"
					color="green"
					onClick={() => setIsAddingContinent(true)}
				>
					+
				</Button>
			</h2>
			<div style={styles.continentList}>
				{continents &&
					continents.length > 0 &&
					continents.map((con, index) => {
						let myLocations;
						if (locations && locations.length > 0) {
							myLocations = locations.filter((l) => l.continent_id === con._id);
						}
						return (
							<Panel
								shaded
								bordered
								bodyFill
								style={styles.continentCard}
								key={`continent-${con._id}`}
							>
								<Panel>
									<h4 style={{ marginBottom: theme.spacing(2.5) }}>
										{con.name.ru}{' '}
										<IconButton
											size="xs"
											icon={<Icon as={IoMdAdd} />}
											appearance="subtle"
											color="green"
											circle
											onClick={() => {
												setAddedToContId(con._id);
												setIsAddingLocation(true);
											}}
										/>
									</h4>
									<hr />
									<p style={{ marginBottom: theme.spacing(2.5) }}>
										<strong>Центр: </strong>
										{con.central.long} {con.central.lat}
									</p>
									<hr />
									{myLocations && myLocations.length > 0 && (
										<>
											<p style={{ marginBottom: theme.spacing(4), fontWeight: '700' }}>
												Локации
											</p>
											<List style={{ marginBottom: theme.spacing(5) }}>
												{myLocations.map((loc, index) => {
													return (
														<List.Item key={`con-${con._id}-loc-${loc._id}`}>
															<FlexboxGrid justify="space-between" align="middle">
																<FlexboxGrid.Item style={{ fontSize: theme.spacing(3) }}>
																	<p>
																		<strong>Долгота: </strong>
																		{loc.long}
																	</p>
																	<p>
																		<strong>Широта: </strong>
																		{loc.lat}
																	</p>
																</FlexboxGrid.Item>
																<FlexboxGrid.Item style={{ fontSize: theme.spacing(3) }}>
																	<ButtonToolbar>
																		<IconButton
																			size="xs"
																			icon={<Icon as={TiEdit} />}
																			appearance="primary"
																			color="cyan"
																			circle
																			onClick={() => {
																				setEditedLocation(loc);
																				setIsEditingLocation(true);
																			}}
																		/>
																		<IconButton
																			size="xs"
																			icon={<Icon as={MdDeleteForever} />}
																			appearance="primary"
																			color="red"
																			circle
																			onClick={() => deleteLocation(loc._id)}
																		/>
																	</ButtonToolbar>
																</FlexboxGrid.Item>
															</FlexboxGrid>
														</List.Item>
													);
												})}
											</List>
										</>
									)}

									<ButtonToolbar>
										<IconButton
											size="sm"
											icon={<Icon as={TiEdit} />}
											appearance="primary"
											color="cyan"
											circle
											onClick={() => {
												setEditedContinent(con);
												setIsEditingContinent(true);
											}}
										/>
										<IconButton
											size="sm"
											icon={<Icon as={MdDeleteForever} />}
											appearance="primary"
											color="red"
											circle
											onClick={() => deleteContinent(con._id)}
										/>
									</ButtonToolbar>
								</Panel>
							</Panel>
						);
					})}
			</div>
			<AddContinent
				open={isAddingContinent}
				fetchData={fetchData}
				onClose={() => {
					setIsAddingContinent(false);
				}}
			/>
			<EditContinent
				open={isEditingContinent}
				continent={editedContinent}
				fetchData={fetchData}
				onClose={() => {
					setIsEditingContinent(false);
					setEditedContinent(null);
				}}
			/>
			<AddLocation
				open={isAddingLocation}
				fetchData={fetchLocations}
				cont_id={addedToContId}
				onClose={() => {
					setAddedToContId(null);
					setIsAddingLocation(false);
				}}
			/>
			<EditLocation
				open={isEditingLocation}
				location={editedLocation}
				fetchData={fetchLocations}
				onClose={() => {
					setIsEditingLocation(false);
					setEditedLocation(null);
				}}
			/>
		</div>
	);
};

export default Locations;
