import React, { useRef, useState } from 'react';
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
import axios from 'axios';
import nameInst from '../../../imgs/instructions/locations-continents.jpg';
import centerInst from '../../../imgs/instructions/locations-continent-center.jpg';

const AddContinent = React.forwardRef((props, ref) => {
	const { open, onClose, fetchData } = props;

	const model = Schema.Model({
		nameRu: Schema.Types.StringType().isRequired(
			'Введите название континента на русском!'
		),
		nameEn: Schema.Types.StringType().isRequired(
			'Введите название континента на английском!'
		),
		long: Schema.Types.StringType()
			.isRequired('Введите долготу!')
			.pattern(/^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/, 'Неверное значение'),
		lat: Schema.Types.StringType()
			.isRequired('Введите широту!')
			.pattern(/^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/, 'Неверное значение'),
	});

	const defaultFormValue = {
		nameRu: '',
		nameEn: '',
		long: '',
		lat: '',
	};

	const formRef = useRef(null);
	const [formError, setFormError] = useState({});
	const [formValue, setFormValue] = useState(defaultFormValue);

	const [isReady, setIsReady] = useState(true);

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
				Добавлено!
			</Message>
		);
	};
	const messagePlacement = 'topCenter';

	const onSubmit = async () => {
		if (formRef.current.check()) {
			setIsReady(false);

			const body = {
				name: {
					ru: formValue.nameRu,
					en: formValue.nameEn,
				},
				central: {
					long: formValue.long,
					lat: formValue.lat,
				},
			};

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			};

			try {
				const { data } = await axios.post(
					`/api/locations/continents`,
					body,
					config
				);

				if (data.status === 'success') {
					setIsReady(true);
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
					toaster.push(errorMessage('Не удалось добавить континет!'), {
						placement: messagePlacement,
					});
				}
			}
		}
	};

	return (
		<Drawer ref={ref} open={open} onClose={onClose} size="md">
			<Drawer.Header>
				<Drawer.Title>Добавить континент</Drawer.Title>
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
				>
					<MultiLangInputField
						runame="nameRu"
						enname="nameEn"
						label="Наименование континента"
						popoverProps={{
							text: 'Наименование континента',
							img: nameInst,
						}}
						ruerror={formError.nameRu}
						enerror={formError.nameEn}
					/>
					<MultiLangInputField
						runame="long"
						enname="lat"
						label="Центральная точка континента"
						popoverProps={{
							text:
								'Точка которая окажется в центре поля зрения карты при выборе континента',
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

export default AddContinent;
