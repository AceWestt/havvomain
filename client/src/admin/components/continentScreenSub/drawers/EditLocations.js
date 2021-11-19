import React, { useRef, useState, useEffect } from 'react';
import {
	Schema,
	Message,
	Form,
	ButtonToolbar,
	Button,
	toaster,
	Drawer,
} from 'rsuite';
import FormWrapper from '../../FormWrapper';
import MultiLangInputField from '../../MultiLangInputField';
import ReadOnlyToggle from '../../ReadOnlyToggle';
import axios from 'axios';
import centerInst from '../../../imgs/instructions/locations-continent-center.jpg';

const EditLocation = React.forwardRef((props, ref) => {
	const { open, onClose, location, fetchData } = props;

	const model = Schema.Model({
		long: Schema.Types.StringType()
			.isRequired('Введите долготу!')
			.pattern(/^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/, 'Неверное значение'),
		lat: Schema.Types.StringType()
			.isRequired('Введите широту!')
			.pattern(/^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/, 'Неверное значение'),
	});

	const defaultFormValue = {
		long: '',
		lat: '',
	};

	const formRef = useRef(null);
	const [formError, setFormError] = useState({});
	const [formValue, setFormValue] = useState(defaultFormValue);

	const [isReady, setIsReady] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [id, setId] = useState(null);

	useEffect(() => {
		if (location) {
			setFormValue({
				long: location.long,
				lat: location.lat,
			});
			setId(location._id);
			setIsReady(true);
		}
	}, [location]);

	const errorMessage = (error) => {
		return (
			<Message showIcon type="error">
				{error}
			</Message>
		);
	};

	const successMessage = () => {
		return (
			<Message showIcon type="success" duration={5000}>
				Изменено!
			</Message>
		);
	};
	const messagePlacement = 'topCenter';

	const onSubmit = async () => {
		if (formRef.current.check()) {
			setIsReady(false);

			const body = {
				long: formValue.long,
				lat: formValue.lat,
			};

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			};

			try {
				const { data } = await axios.put(
					`/api/locations/locations/${id}`,
					body,
					config
				);

				if (data.status === 'success') {
					setIsEditable(false);
					setFormValue(defaultFormValue);
					fetchData();
					onClose();
					toaster.push(successMessage(), {
						placement: messagePlacement,
					});
				}
			} catch (error) {
				setIsReady(true);
				console.log(error);
				if (error.response?.data.error) {
					toaster.push(errorMessage(error.response.data.error), {
						placement: messagePlacement,
					});
				} else {
					toaster.push(errorMessage('Не удалось обновить континет!'), {
						placement: messagePlacement,
					});
				}
			}
		}
	};

	return (
		<Drawer ref={ref} open={open} onClose={onClose} size="md">
			<Drawer.Header>
				<Drawer.Title>Обновить Локацию</Drawer.Title>
			</Drawer.Header>
			<Drawer.Body>
				<FormWrapper
					customClass="products-add-cat-form"
					formRef={formRef}
					onChange={setFormValue}
					onCheck={setFormError}
					model={model}
					formValue={formValue}
					onSubmit={onSubmit}
					readOnly={!isEditable}
				>
					<ReadOnlyToggle
						checked={isEditable}
						loading={!isReady}
						disabled={!isReady}
						onChange={setIsEditable}
					/>
					<MultiLangInputField
						runame="long"
						enname="lat"
						label="Координаты"
						popoverProps={{
							text: 'Координаты локации которая входит в выбранный континент',
							img: centerInst,
						}}
						multiText="long/lat"
						tooltipText="долгота и широта"
						ruerror={formError.long}
						enerror={formError.lat}
					/>
					<Form.Group>
						<ButtonToolbar>
							<Button
								appearance="primary"
								color="cyan"
								loading={!isReady}
								type="submit"
								disabled={!isEditable}
							>
								Сохранить
							</Button>
						</ButtonToolbar>
					</Form.Group>
				</FormWrapper>
			</Drawer.Body>
		</Drawer>
	);
});

export default EditLocation;
