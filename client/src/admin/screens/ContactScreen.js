import React, { useRef, useState, useEffect } from 'react';
import FormWrapper from '../components/FormWrapper';
import MultiLangInputField from '../components/MultiLangInputField';
import ReadOnlyToggle from '../components/ReadOnlyToggle';
import phoneInst from '../imgs/instructions/contact-phone.jpg';
import officeCoordsInst from '../imgs/instructions/contact-office-coords.jpg';
import worktimeInst from '../imgs/instructions/contact-worktime.jpg';
import emailInst from '../imgs/instructions/contact-email.jpg';
import addressInst from '../imgs/instructions/contact-address.jpg';
import { Schema, Message, Form, ButtonToolbar, Button, toaster } from 'rsuite';
import axios from 'axios';
import { useAxiosGet } from '../../common/hooks/useAxiosGet';

const ContactScreen = ({ history }) => {
	const model = Schema.Model({
		addressRu: Schema.Types.StringType().isRequired('Введите адресс на русском'),
		addressEn: Schema.Types.StringType().isRequired(
			'Введите адресс на английском'
		),
		phoneRu: Schema.Types.StringType().isRequired('Введите текст на русском'),
		phoneEn: Schema.Types.StringType().isRequired('Введите текст на английском.'),
		emailRu: Schema.Types.StringType().isRequired('Введите текст на русском.'),
		emailEn: Schema.Types.StringType().isRequired('Введите текст на русском.'),
		worktimeRu: Schema.Types.StringType().isRequired('Введите текст на русском.'),
		worktimeEn: Schema.Types.StringType().isRequired('Введите текст на русском.'),
		officeCoordLong: Schema.Types.StringType()
			.isRequired('Введтие долготу офиса')
			.pattern(/^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/, 'Неверное значение'),
		officeCoordLat: Schema.Types.StringType()
			.isRequired('Введтие широту офиса')
			.pattern(/^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/, 'Неверное значение'),
	});

	const formRef = useRef(null);
	const [formError, setFormError] = useState({});
	const [formValue, setFormValue] = useState({
		addressRu: '',
		addressEn: '',
		phoneRu: '',
		phoneEn: '',
		emailRu: '',
		emailEn: '',
		worktimeRu: '',
		worktimeEn: '',
		officeCoordLong: '',
		officeCoordLat: '',
	});
	const [isReady, setIsReady] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [id, setId] = useState(null);

	const { data, success, error, fetchData } = useAxiosGet('/api/contactscreen');

	useEffect(() => {
		if (error) {
			if (error.response.data.error) {
				toaster.push(errorMessage(error.response.data.error), {
					placement: messagePlacement,
				});
			} else {
				toaster.push(errorMessage('Не удалось Получить данные!'), {
					placement: messagePlacement,
				});
			}
		}
		if (success) {
			setIsReady(true);
			setId(data._id);
			setFormValue({
				addressRu: data.address.ru,
				addressEn: data.address.en,
				phoneRu: data.phone.ru,
				phoneEn: data.phone.en,
				emailRu: data.email.ru,
				emailEn: data.email.en,
				worktimeRu: data.worktime.ru,
				worktimeEn: data.worktime.en,
				officeCoordLong: data.officeCoords.long,
				officeCoordLat: data.officeCoords.lat,
			});
		}
	}, [data, success, error]);

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
				<b>Успех!</b>
				<br />
				Пожалуйста, не забудьте включить редактирование перед тем как снова
				приступить к работе.
			</Message>
		);
	};
	const messagePlacement = 'topCenter';

	const onSubmit = async () => {
		if (formRef.current.check()) {
			setIsReady(false);
			setIsEditable(false);

			const body = {
				address: {
					ru: formValue.addressRu,
					en: formValue.addressEn,
				},
				phone: {
					ru: formValue.phoneRu,
					en: formValue.phoneEn,
				},
				email: {
					ru: formValue.emailRu,
					en: formValue.emailEn,
				},
				worktime: {
					ru: formValue.worktimeRu,
					en: formValue.worktimeEn,
				},
				officeCoords: {
					long: formValue.officeCoordLong,
					lat: formValue.officeCoordLat,
				},
			};

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			};

			try {
				const { data } = await axios.put(`/api/contactscreen/${id}`, body, config);

				if (data.status === 'success') {
					setIsReady(true);
					toaster.push(successMessage(), {
						placement: messagePlacement,
					});
					await fetchData();
				}
			} catch (error) {
				if (error.response.data.error) {
					toaster.push(errorMessage(error.response.data.error), {
						placement: messagePlacement,
					});
				} else {
					toaster.push(errorMessage('Не удалось сохранить изменения!'), {
						placement: messagePlacement,
					});
				}
			}
		}
	};

	return (
		<FormWrapper
			customClass="main-screen-form"
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
				runame="addressRu"
				enname="addressEn"
				label="Адрес"
				textarea
				popoverProps={{
					text: 'Адрес на футере',
					img: addressInst,
				}}
				ruerror={formError.addressRu}
				enerror={formError.addressEn}
			/>
			<MultiLangInputField
				runame="phoneRu"
				enname="phoneEn"
				label="Номер(а) телефона(ов)"
				textarea
				popoverProps={{
					text: 'Номер(а) телефона(ов) на футере',
					img: phoneInst,
				}}
				ruerror={formError.phoneRu}
				enerror={formError.phoneEn}
			/>
			<MultiLangInputField
				runame="emailRu"
				enname="emailEn"
				label="Email"
				textarea
				popoverProps={{
					text: 'Email на футере',
					img: emailInst,
				}}
				ruerror={formError.emailRu}
				enerror={formError.emailEn}
			/>
			<MultiLangInputField
				runame="worktimeRu"
				enname="worktimeEn"
				label="Режим работы"
				textarea
				popoverProps={{
					text: 'Режим работы на футере',
					img: worktimeInst,
				}}
				ruerror={formError.worktimeRu}
				enerror={formError.worktimeEn}
			/>
			<MultiLangInputField
				runame="officeCoordLong"
				enname="officeCoordLat"
				label="Координаты офиса на карте"
				popoverProps={{
					text: 'Координаты офиса на карте',
					img: officeCoordsInst,
				}}
				ruerror={formError.officeCoordLong}
				enerror={formError.officeCoordLat}
			/>
			<Form.Group>
				<ButtonToolbar>
					<Button
						appearance="primary"
						color="cyan"
						loading={!isReady}
						disabled={!isEditable}
						type="submit"
					>
						Сохранить
					</Button>
				</ButtonToolbar>
			</Form.Group>
		</FormWrapper>
	);
};

export default ContactScreen;
