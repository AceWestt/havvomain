import React, { useRef, useState, useEffect } from 'react';
import FormWrapper from '../components/FormWrapper';
import MultiLangInputField from '../components/MultiLangInputField';
import ReadOnlyToggle from '../components/ReadOnlyToggle';
import { Schema, Message, Form, ButtonToolbar, Button, toaster } from 'rsuite';
import axios from 'axios';
import { useAxiosGet } from '../../common/hooks/useAxiosGet';
import productTitleInst from '../imgs/instructions/others-product-title.jpg';
import mapTitleInst from '../imgs/instructions/others-map-title.jpg';
import mapTextTopInst from '../imgs/instructions/others-map-text-top.jpg';
import mapTextBottomInst from '../imgs/instructions/others-map-text-bottom.jpg';
import contactsTextInst from '../imgs/instructions/others-contacts-text.jpg';
import copyrightInst from '../imgs/instructions/others-copyright.jpg';

const OthersScreen = () => {
	const model = Schema.Model({
		productTitleRu: Schema.Types.StringType().isRequired(
			'Введите заголовок на русском.'
		),
		productTitleEn: Schema.Types.StringType().isRequired(
			'Введите заголовок на английском.'
		),
		mapTitleRu: Schema.Types.StringType().isRequired(
			'Введите заголовок на русском.'
		),
		mapTitleEn: Schema.Types.StringType().isRequired(
			'Введите заголовок на английском.'
		),
		mapTextTopRu: Schema.Types.StringType().isRequired(
			'Введите текст на русском.'
		),
		mapTextTopEn: Schema.Types.StringType().isRequired(
			'Введите текст на английском.'
		),
		mapTextBottomRu: Schema.Types.StringType().isRequired(
			'Введите текст на русском.'
		),
		mapTextBottomEn: Schema.Types.StringType().isRequired(
			'Введите текст на английском.'
		),
		contactsTextRu: Schema.Types.StringType().isRequired(
			'Введите текст на русском.'
		),
		contactsTextEn: Schema.Types.StringType().isRequired(
			'Введите текст на английском.'
		),
		copyrightRu: Schema.Types.StringType().isRequired(
			'Введите текст на русском.'
		),
		copyrightEn: Schema.Types.StringType().isRequired(
			'Введите текст на английском.'
		),
	});

	const formRef = useRef(null);
	const [formError, setFormError] = useState({});
	const [formValue, setFormValue] = useState({
		productTitleRu: '',
		productTitleEn: '',
		mapTitleRu: '',
		mapTitleEn: '',
		mapTextTopRu: '',
		mapTextTopEn: '',
		mapTextBottomRu: '',
		mapTextBottomEn: '',
		contactsTextRu: '',
		contactsTextEn: '',
		copyrightRu: '',
		copyrightEn: '',
	});

	const [isReady, setIsReady] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [id, setId] = useState(null);

	const { data, success, error, fetchData } = useAxiosGet('/api/othersscreen');
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
				productTitleRu: data.productTitle.ru,
				productTitleEn: data.productTitle.en,
				mapTitleRu: data.mapTitle.ru,
				mapTitleEn: data.mapTitle.en,
				mapTextTopRu: data.mapText.top.ru,
				mapTextTopEn: data.mapText.top.en,
				mapTextBottomRu: data.mapText.bottom.ru,
				mapTextBottomEn: data.mapText.bottom.en,
				contactsTextRu: data.contactsText.ru,
				contactsTextEn: data.contactsText.en,
				copyrightRu: data.copyright.ru,
				copyrightEn: data.copyright.en,
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
			formData.append(
				'productTitle',
				JSON.stringify({
					ru: formValue.productTitleRu,
					en: formValue.productTitleEn,
				})
			);
			formData.append(
				'mapTitle',
				JSON.stringify({
					ru: formValue.mapTitleRu,
					en: formValue.mapTitleEn,
				})
			);
			formData.append(
				'mapText',
				JSON.stringify({
					top: {
						ru: formValue.mapTextTopRu,
						en: formValue.mapTextTopEn,
					},
					bottom: {
						ru: formValue.mapTextBottomRu,
						en: formValue.mapTextBottomEn,
					},
				})
			);

			formData.append(
				'contactsText',
				JSON.stringify({
					ru: formValue.contactsTextRu,
					en: formValue.contactsTextEn,
				})
			);

			formData.append(
				'copyright',
				JSON.stringify({
					ru: formValue.copyrightRu,
					en: formValue.copyrightEn,
				})
			);

			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			};

			try {
				const { data } = await axios.put(
					`/api/othersscreen/${id}`,
					formData,
					config
				);

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
			customClass="others-screen"
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
				runame="productTitleRu"
				enname="productTitleEn"
				label="Заголовок на блоке “наша продукция”"
				popoverProps={{
					text: 'Заголовок на блоке “наша продукция”',
					img: productTitleInst,
				}}
				ruerror={formError.productTitleRu}
				enerror={formError.productTitleEn}
			/>
			<MultiLangInputField
				runame="mapTitleRu"
				enname="mapTitleEn"
				label="Заголовок на блоке с картой"
				popoverProps={{
					text: 'Заголовок на блоке с картой',
					img: mapTitleInst,
				}}
				ruerror={formError.mapTitleRu}
				enerror={formError.mapTitleEn}
			/>
			<MultiLangInputField
				runame="mapTextTopRu"
				enname="mapTextTopEn"
				label="Текст сверху на блоке с картой"
				popoverProps={{
					text: 'Текст сверху на блоке с картой',
					img: mapTextTopInst,
				}}
				ruerror={formError.mapTextTopRu}
				enerror={formError.mapTextTopEn}
			/>
			<MultiLangInputField
				runame="mapTextBottomRu"
				enname="mapTextBottomEn"
				label="Текст снизу на блоке с картой"
				textarea
				popoverProps={{
					text: 'Текст снизу на блоке с картой',
					img: mapTextBottomInst,
				}}
				ruerror={formError.mapTextBottomRu}
				enerror={formError.mapTextBottomEn}
			/>
			<MultiLangInputField
				runame="contactsTextRu"
				enname="contactsTextEn"
				label="Текст на футере"
				popoverProps={{
					text: 'Текст на футере',
					img: contactsTextInst,
				}}
				ruerror={formError.contactsTextRu}
				enerror={formError.contactsTextEn}
			/>
			<MultiLangInputField
				runame="copyrightRu"
				enname="copyrightEn"
				label="Копирайт текст снизу на футере"
				popoverProps={{
					text: 'Копирайт текст снизу на футере',
					img: copyrightInst,
				}}
				ruerror={formError.copyrightRu}
				enerror={formError.copyrightEn}
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

export default OthersScreen;
