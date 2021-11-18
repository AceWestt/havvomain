import React, { useRef, useState, useEffect } from 'react';
import FormWrapper from '../components/FormWrapper';
import PhoneField from '../components/MaskedField';
import MultiLangInputField from '../components/MultiLangInputField';
import ReadOnlyToggle from '../components/ReadOnlyToggle';
import PhoneInst from '../imgs/instructions/header-phone.jpg';
import titleInst from '../imgs/instructions/header-title.jpg';
import descInst from '../imgs/instructions/header-description.jpg';
import { Schema, Message, Form, ButtonToolbar, Button, toaster } from 'rsuite';
import axios from 'axios';
import { useAxiosGet } from '../../common/hooks/useAxiosGet';

const MainScreen = ({ history }) => {
	const model = Schema.Model({
		phone: Schema.Types.StringType().isRequired('Введите номер телефона.'),
		titleRu: Schema.Types.StringType().isRequired(
			'Введите заголовок на русском.'
		),
		titleEn: Schema.Types.StringType().isRequired(
			'Введите заголовок на английском.'
		),
		descriptionRu: Schema.Types.StringType().isRequired(
			'Введите описание на русском.'
		),
		descriptionEn: Schema.Types.StringType().isRequired(
			'Введите описание на английском.'
		),
	});

	const formRef = useRef(null);
	const [formError, setFormError] = useState({});
	const [formValue, setFormValue] = useState({
		phone: '',
		titleRu: '',
		titleEn: '',
		descriptionRu: '',
		descriptionEn: '',
	});
	const [isReady, setIsReady] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [id, setId] = useState(null);

	const { data, success, error, fetchData } = useAxiosGet('/api/mainscreen');

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
				phone: data.phone,
				titleRu: data.title.ru,
				titleEn: data.title.en,
				descriptionRu: data.description.ru,
				descriptionEn: data.description.en,
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

			const formData = new FormData();
			formData.append('phone', formValue.phone);
			formData.append(
				'title',
				JSON.stringify({
					ru: formValue.titleRu,
					en: formValue.titleEn,
				})
			);
			formData.append(
				'description',
				JSON.stringify({
					ru: formValue.descriptionRu,
					en: formValue.descriptionEn,
				})
			);

			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			};

			try {
				const { data } = await axios.put(`/api/mainscreen/${id}`, formData, config);

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

			<PhoneField
				name="phone"
				label="Номер телефона"
				mask="(99) 999 99 99"
				popoverProps={{
					text: 'Номер на навигоцанниом меню на главном экране',
					img: PhoneInst,
				}}
				error={formError.phone}
			/>
			<MultiLangInputField
				runame="titleRu"
				enname="titleEn"
				label="Заголовок"
				popoverProps={{
					text: 'Заголовок на главном экране',
					img: titleInst,
				}}
				ruerror={formError.titleRu}
				enerror={formError.titleEn}
			/>
			<MultiLangInputField
				runame="descriptionRu"
				enname="descriptionEn"
				label="Описание"
				textarea
				popoverProps={{
					text: 'Описание на главном экране',
					img: descInst,
				}}
				ruerror={formError.descriptionRu}
				enerror={formError.descriptionEn}
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

export default MainScreen;
